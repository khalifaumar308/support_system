import ComplaintsModel from "../models/ComplaintsModel";
import { Request, Response } from "express";


export type COMPLAINCOMMENT = { by: string, date: string, comment: string }

export interface COMPLAIN {
  schoolId: string;
  affiliateId: string;
  issue: string;
  status: string;
  comments: [
    COMPLAINCOMMENT
  ] | []
}

export const saveComplain = async (req: Request, res: Response) => {
  const { schoolId, affiliateId, issue, status, comments } = req.body

  if (!schoolId || !affiliateId || !issue ) {
    return res.status(400).json({ message: "User Id is required" });
  }
  try {
    const newComplain = await ComplaintsModel.create({ schoolId, affiliateId, issue, status, comments })
    return res.status(201).json({message:"School Created Succc"})
   } catch {
    return res.status(400).json({error:"Error Occurs"})
  }
}

export const getComplains = async (req: Request, res: Response) => {
  const params = req.query
  // console.log(params)
  try {
    const complaints = await ComplaintsModel.find({ ...params })
    // console.log(complaints)
    return res.status(200).json({complaints})
  } catch (error) {
    return res.status(400).json({ error: "Error Occurs" })
  }
}

export const updateComplain = async(req: Request, res: Response) => {
  const id = req.params[0]
  const params = req.body
  if (!id) return res.status(400).json({error:"id missing"})
  try {
    console.log(params, id, "update")
    const updated = await ComplaintsModel.findByIdAndUpdate(id, params)
    return res.status(201).json({message:"complain updated"})
  } catch (error) {
    return res.status(400).json({error:"Error occurs"})
  }
}