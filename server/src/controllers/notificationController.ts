import { NotificationModel, notification } from "../models/Notifications";
import { Request, Response } from "express";

export const saveNotification = async (req: Request, res: Response) => {
  const data = req.body;
  if ((!data.senderId) || (!data.recieverId) || (!data.type)) {
    return res.status(400).json({ message: "All iputs are required" })
  };
  try {
    const created = await NotificationModel.create(data)
    return res.status(201).json({ message: "Notification saved" });
  } catch (error) {
    return res.status(400).json({message:error})
  }
};

export const getUserNotifications = async (req: Request, res: Response) => {
  const userId = req.params[0];

  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const notifications = await NotificationModel.find({ recieverId: userId }).lean().exec()
    return res.status(200).json({ notifications })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const deleteUserNotifications = async (req: Request, res: Response) => {
  const userId = req.params[0]
  if (!userId) {
    return res.status(400).json({ message: "User id required" })
  }

  try {
    const deleted = await NotificationModel.deleteMany({ recieverId: userId });
    console.log(deleted)
    return res.status(200).json({ message: "Notifications deleted succ" })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
};

export const saveSingleNotification = async (notification:notification) => {
  try {
    const saved = await NotificationModel.create(notification)
    return 'created'
  } catch (error) {
    console.log(error)
    return ''
  }
}