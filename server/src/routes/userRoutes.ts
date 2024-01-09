import { getAffiliates } from "../controllers/affiliateController";
import { userLogin, registerUser, refreshToken } from "../controllers/userController";
import { updateSchool, getSchools, createSchool } from "../controllers/schoolController";
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