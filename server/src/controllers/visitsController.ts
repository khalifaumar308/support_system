import { VisitsModel } from "../models/Visits";
import { Request, Response } from "express";

export const createVisit = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.userId || !data.schoolName || !data.comment || !data.address) {
    return res.status(400).json({ message: "Visit Data Incomplete" });
  }
  try {
    await VisitsModel.create(data);
    return res.status(201).json({ message: "Visit created succcessfully" });
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const getVisits = async (req: Request, res: Response) => {
  const userId = req.params[0];

  if (userId) {
    const visits = await VisitsModel.find({ userId }).exec()
    if (visits) {
      return res.status(200).json({ visits })
    }
    return res.status(404).json({ message: "No visits found for user" })
  }
  const allVisits = await VisitsModel.find({}).exec();
  return res.status(200).json({ visits: allVisits })
};

export const deleteVisit = async (req: Request, res: Response) => {
  const visitId = req.params[0];
  if (!visitId) {
    return res.status(400).json({message:"visit id missing"})
  }
  try {
    await VisitsModel.findByIdAndDelete(visitId)
    return res.status(200).json({message:"visit deleted succ"})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:"visit deletion failed"})
  }
}

export const getSingleVisit = async (req: Request, res: Response) => {
  const visitId = req.params[0];
  if (!visitId) {
    return res.status(400).json({ message: "visit id is required" })
  };
  const visit = await VisitsModel.findById(visitId).lean().exec();
  return res.status(200).json({ visit })
};