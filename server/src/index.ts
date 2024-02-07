import cors from 'cors';
import mongoose from "mongoose";
import express, { Express, Request, Response, RequestHandler } from "express";
import { saveSingleNotification } from './controllers/notificationController';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import http from 'http';
import { UsersModel } from './models';

import { logger } from './middleware/logRequests';
import { userRouter } from './routes/userRoutes';
import { saveMessage } from './controllers/messageController';
// import { sendMail } from './services/email';

dotenv.config();
const allowedOrigins:string[] = ["https://support-system-nine.vercel.app", "http://localhost:5173"];
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
    origin: "https://support-system-nine.vercel.app",
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

io.on("connection", (socket) =>  {
  socket.on("newUser", (data) => {
    addNewUser(data.id, socket.id, data.name);
    if (data.role==='Admin') {
      socket.join('Admins-Group')
    }
  });

  socket.on("sendMessage", async (data) => {
    const receivers = await UsersModel.find({ role: "Admin" }).lean().exec()
    const ids = receivers.map((rec => `${rec._id}`));
    if (['School Registered', 'New School Visited'].includes(data.title)) {
      io.to('Admins-Group').emit('recieveMessage', data);
      ids.forEach(id => saveMessage({ ...data, recieverId: id }));
    } else {
      const receiver = getUser(data.recieverId);
      if (receiver) {
        // console.log(receiver, 'online')
        io.to(receiver.socketId).emit("recieveMessage", data);
      };
      saveMessage(data)
    }
    // saveSingleNotification({senderId, recieverId, type, url, senderName})
  });

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