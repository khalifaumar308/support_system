import UsersModel from "../models/UsersModel";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/email";
import { Request, Response } from "express";

interface tokenDecode {
  email: string;
  name: string;
  role: string;
}
const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export const getUsers:RequestHandler = async (req, res) => {
  const filter = req.query;
  try {
    if (filter.id) {
      const user = await UsersModel.findById(filter.id).lean().exec();
      if (user) {
        return res.status(200).json([user]);
      }
      return res.status(400).json({ message: "User not found" });
    }
    const users = await UsersModel.find(filter).sort("name").select("-password -__v").lean().exec();
    // await sleep(2000)
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const userLogin: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await UsersModel.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({message:'Unauthorized'}); //Unauthorized
  // evaluate password
  // const match = await bcrypt.compare(password, foundUser.password);
  // if (match) {
    const role = Object.values(foundUser.role).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
        name: foundUser.name,
        role: role,
      },
      process.env.ACCESS_TOKEN_SECRET || '',
      { expiresIn: "10d" }
    );
    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET || '',
      { expiresIn: "15d" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await UsersModel.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    const { name, _id, phone, address } = foundUser;
    console.log({ token: 'fgg', email, role: foundUser.role, name, id: foundUser._id })
    return res
      .status(201)
      .json({ token: accessToken, email, role: foundUser.role, name, _id, phone, address });
  // } else {
  //   return res.status(401).json({message:"Login Failed"});
  // }
};

export const registerUser:RequestHandler = async (req, res) => {
  const data = req.body;
  const { email, password, name, role, rank } = data
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await UsersModel.findOne({ email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: `user ${email} exists` });
  }

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const user = await UsersModel.create({
      ...data,
      password: hashedPwd,
    });

    if (role === "Affiliate") {
      // const { phone, schoolsReferred, location } = req.body
      // await AffiliateModel.create({
      //   email, name, phone, schoolsReferred, userId:user._id, location
      // });
      await sendMail({email, name, password})
    }


    console.log(`New ${role}: ${name} ${email} created!`);
    return res.status(201).json({ success: `New ${role} ${name} ${email} created!` });
  } catch (err: unknown) {
    const message = err instanceof Error? err.message : `${err}`
    return res.status(500).json({ message });
  }
};

export const refreshToken:RequestHandler = async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://northfield-frontend.vercel.app');
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  const foundUser = await UsersModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || '',
      async (err:any, decoded:any) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await UsersModel.findOne({
          email: decoded.email,
        }).exec();
        if (hackedUser) {
          hackedUser.refreshToken = [];
          const result = await hackedUser.save();
        }
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || '',
    async (err:any, decoded:any) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

      // Refresh token was still valid
      // const role = Object.values(foundUser.role);
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET || '',
        { expiresIn: "10d" }
      );

      const newRefreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET || '',
        { expiresIn: "15d" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
};

export const updateUser = async(req:Request, res:Response) => {
  const id = req.params["id"]
  if (!id) {
    return res.status(400).json({error:"user id missing"})
  }
  try {
    const updates = req.body
    const updatedUser = await UsersModel.findByIdAndUpdate(id, updates)
    if (!updatedUser) return res.status(400).json({ error: "user update failed" })
    const { name, _id, email, address, phone, role }  = updatedUser
    return res.status(201).json({ message: "user updated successfully", user: { name, _id, email, address, phone, role } })
  } catch (error) {
    res.status(400).json({ error })
  }
}