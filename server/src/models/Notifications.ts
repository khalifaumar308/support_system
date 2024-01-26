import { Schema, Types, model } from "mongoose";

export type notification = {
  recieverId: Types.ObjectId;
  senderId: Types.ObjectId;
  url: string;
  type: string;
  senderName: string;
}

const notificationSchema = new Schema<notification>({
  recieverId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  senderId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  url: String,
  type: String,
  senderName: String,
}, { timestamps: true });

export const NotificationModel =  model('Notification', notificationSchema);