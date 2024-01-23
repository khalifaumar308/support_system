import cors from 'cors';
import mongoose from "mongoose";
import express, { Express, Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import http from 'http'

import { logger } from './middleware/logRequests';
import { userRouter } from './routes/userRoutes';
// import { sendMail } from './services/email';

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

type onlineUser = {
  name: string;
  socketId: string;
  userId: string;
}

let onlineUsers:onlineUser[] = [];

const addNewUser = (userId:string, socketId:string, name:string) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId, name });
  // console.log(onlineUsers)
};

const removeUser = (socketId:string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};


const getUser = (userId:string) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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

io.on("connection", (socket) => {
  socket.on("newUser", (data) => {
    // console.log(data)
    addNewUser(data.id, socket.id, data.name);
    console.log(onlineUsers)
  });

  socket.on("sendNotification", ({ senderId, recieverId, type, url, senderName }) => {
    const receiver = getUser(recieverId);
    console.log(recieverId, 'idddd')
    if (receiver) {
      console.log(receiver, 'online')
      io.to(receiver.socketId).emit("recieveNotification", {
        senderName,
        type,
        url,
      });
    }
  });

  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderName,
  //     text,
  //   });
  // });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

connectDB()

mongoose.connection.once("open", () => {
  server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
})

app.use('/user', userRouter);