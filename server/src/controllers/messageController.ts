import { MessageModel } from "../models";
import { message } from "../models/MessageModel";
import { Request, Response } from "express";

export const saveMessage = async (data: message) => {
  try {
    const created = await MessageModel.create(data);
    return created
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getMessages = async (req: Request, res: Response) => {
  const userId = req.params[0];
  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }
  try {
    const messages = await MessageModel.find({ recieverId: userId }).sort({ createdAt: -1 }).lean().exec();
    console.log(userId, messages)
    return res.status(200).json({messages})
  } catch (error) {
    return res.status(400).json({error})
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  const messageId = req.params[0];

  try {
    await MessageModel.findByIdAndUpdate(messageId, { read: true });
    return res.status(201).json({ message: 'Message Updated' });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params[0];
  try {
    await MessageModel.findByIdAndDelete(messageId);
    return res.status(201).json({ message: 'Message Deleted' });
  } catch (error) {
    return res.status(400).json({ error });
  }
}