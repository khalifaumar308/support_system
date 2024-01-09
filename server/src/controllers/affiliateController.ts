import AffiliateModel from "../models/AffiliateModel";
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

  const affiliates = await AffiliateModel.find({});
  return res
      .status(200).json({affiliates})

}