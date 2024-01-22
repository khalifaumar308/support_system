import { getAffiliates, getAffiliateSchools, createAffiliateSchool } from "../controllers/affiliateController";
import { userLogin, registerUser, refreshToken } from "../controllers/userController";
import { updateSchool, getSchools, createSchool } from "../controllers/schoolController";
import { createVisit, getVisits, deleteVisit, getSingleVisit } from "../controllers/visitsController";
import { saveNotification, deleteUserNotifications, getUserNotifications } from "../controllers/notificationController";
import { Router } from "express";

export const userRouter = Router()

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