import { getAffiliates, getAffiliateSchools, createAffiliateSchool } from "../controllers/affiliateController";
import { userLogin, registerUser, refreshToken } from "../controllers/userController";
import { updateSchool, getSchools, createSchool } from "../controllers/schoolController";
import { createVisit, getVisits, deleteVisit, getSingleVisit } from "../controllers/visitsController";
import { saveNotification, deleteUserNotifications, getUserNotifications } from "../controllers/notificationController";
import { getMessages, updateStatus, deleteMessage } from "../controllers/messageController";
import { Router } from "express";
import { sendMail } from "../services/email";
import { Request, Response } from "express";

export const userRouter = Router()

const sendEMail = async (req:Request, res:Response) =>{
  try {
    sendMail(req.body)
    return res.status(200).json({message:"email sent "})

  } catch (error) {
    return res.status(400).json({error})
  }
}

userRouter
  .post('/login', userLogin)
  .post('/register', registerUser)
  .post('/schools', createSchool)
  .get('/refresh', refreshToken)
  .get('/affiliates/*', getAffiliates)
  .get('/schools/*', getSchools)
  .put('/schools/*', updateSchool)
  .post('/visits', createVisit)
  .get('/visits/*', getVisits)
  .get('/affiliate/schools/*', getAffiliateSchools)
  .post('/affiliate/register-school', createAffiliateSchool)
  .delete('/visits/*', deleteVisit)
  .get('/visit/*', getSingleVisit)
  .post('/notification', saveNotification)
  .get('/notification/*', getUserNotifications)
  .delete('/notification/*', deleteUserNotifications)
  .post('/sendmail', sendEMail)
  .get('/message/*', getMessages)
  .delete('/message/*', deleteMessage)
  .put('/message/*', updateStatus)