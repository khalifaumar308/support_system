import { UsersModel } from "../models";
import AffiliateModel from "../models/AffiliateModel";
import schoolsModel from "../models/schoolsModel";
import { Request, Response } from "express";

export const getAffiliates = async (req: Request, res: Response) => {
  const id = req.params[0]
  if (id) {
    const affiliate = await AffiliateModel.findById(id).exec()
    if (affiliate) {
      return res.status(200).json({affiliate})
    }
    return res.status(404).json({message:"Affiliate not found"})
  }

  const affiliates = await AffiliateModel.find({}).sort({ _id: -1 });
  return res
    .status(200).json({affiliates})
}

export const getAffiliateSchools = async (req: Request, res: Response) => {
  const id = req.params[0]
  if (id) {
    const affiliat = await UsersModel.findById(id).exec();
    if (!affiliat) {
      return res.status(404).json({message:"Affiliate not found"})
    }
    const schools = affiliat.schoolsReferred
    const allSchools = []
    for (let index = 0; index < schools.length; index++) {
      const { schoolId, percentage } = schools[index];
      const school = await schoolsModel.findById(schoolId).lean().exec();
      if (school) {
        const perc = school.affiliatePercentage
        allSchools.push({...school, perc})
      } else {
        console.log(`affilaite school ${schoolId} not found`)
      }
    }
    return res.status(200).json({schools:allSchools})
  }
}

export const createAffiliateSchool = async (req: Request, res: Response) => {
  const data = req.body
  if (data) {
    const userId = data.id
    const schoolData = data.schoolData;
    const foundSchool = await schoolsModel.findOne({ 'email': schoolData.email, name: schoolData.name }).exec()
    if (foundSchool) {
      return res.status(409).json({message:"School Exists"})
    }
    try {
      const school = await schoolsModel.create(schoolData)
      const user = await UsersModel.findById(userId)
      if (!user) {
        return res.status(404).json({message:"user not found"})
      }
      const schoolsReferred = user?.schoolsReferred
      schoolsReferred?.push({ schoolId: school.id, percentage: 0 });
      const update = await UsersModel.findByIdAndUpdate(user.id, { schoolsReferred });
      return res.status(201).json({ message: "School Created" });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error });
    }
  }
}