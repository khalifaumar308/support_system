import cors from 'cors';
import mongoose from "mongoose";
import express, { Express, Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { logger } from './middleware/logRequests';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const allowedOrigins:string[] = ["http://127.0.0.1:5173", "http://localhost:5173"];
const credentials:RequestHandler = (req, res, next) => {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", origin);
  }
  next();
};

const corsOptions:cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(credentials);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const connectDB = async () => {
  try {
    console.log("connecting to db ⏰");
    await mongoose.connect(process.env.DATABASE_URI || '');
    console.log("db connected succ 🚀");
  } catch (err) {
    console.error(err);
  }
};


connectDB()

mongoose.connection.once("open", () => {
  app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
})

app.use('/user', userRouter)