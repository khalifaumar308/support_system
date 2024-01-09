import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import { promises as fsp } from "fs"
import path from "path";
import { RequestHandler } from "express";


const logRequests = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsp.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsp.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};


export const logger:RequestHandler = (req, res, next) => {
  logRequests(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  console.log(`${req.method} ${req.path} ${dateTime}`);
  next();
};