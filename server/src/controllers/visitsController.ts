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