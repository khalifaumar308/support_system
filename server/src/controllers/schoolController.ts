import schoolsModel from "../models/schoolsModel";
import { Request, Response } from "express";


export const getSchools = async (req:Request, res:Response) => {
  const id = req.params[0] 
  if (id) {
    const school = await schoolsModel.findById(id).exec()
    if (!school) {
      return res.status(404).json({message:`school ${id} not found`})
    }
    const payment = school?.totalPayable()
    return res.status(200).json({...school.toJSON(), totalPayable:payment})
  }
  const schools = await schoolsModel.find({}).exec(); 
  const sls = schools.map(school => {
    const totalPayable = school.totalPayable()
    return {...school.toJSON(), totalPayable}
  })
  return res.status(200).json({schools:sls})
}


export const updateSchool = async (req: Request, res: Response) => {
  const schoolId = req.params[0]
  if (!schoolId) { return res.status(400) }
  const fields = req.query
  // console.log(fields)
  const update = await schoolsModel.findByIdAndUpdate(schoolId, fields);
  if (update) {
    return res.status(201).json({message:`school ${schoolId} updated`})
  }
  return res.status(400)
}

export const createSchool = async (req: Request, res: Response) => {
  const schoolData = req.body
  if (!schoolData.email || !schoolData.name) {
    return res.status(400).json({message:"email and password required"})
  }
  const foundSchool = await schoolsModel.findOne({ name: schoolData.name, email: schoolData.email }).exec()
  if (foundSchool) {
    return res.status(409).json({message:"School exists"})
  }
  try {
    await schoolsModel.create(schoolData)
    return res.status(201).json({message:`school ${schoolData.name} created`})
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}