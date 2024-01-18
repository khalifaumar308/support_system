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

  const affiliates = await AffiliateModel.find({});
  return res
      .status(200).json({affiliates})

}

export const getAffiliateSchools = async (req: Request, res: Response) => {
  const id = req.params[0]
  if (id) {
    const affiliat = await AffiliateModel.findOne({ userId: id }).exec();
    console.log(affiliat)
    if (!affiliat) {
      return res.status(404).json({message:"Affiliate not found"})
    }
    const schools = affiliat.schoolsReferred
    const allSchools = []
    for (let index = 0; index < schools.length; index++) {
      const { schoolId, percentage } = schools[index];
      const school = await schoolsModel.findById(schoolId).exec();
      if (school) {
        allSchools.push({...school, percentage})
      } else {
        console.log(`affilaite school ${schoolId} not found`)
      }
    }
    return res.status(200).json({schools:allSchools})
  }
}