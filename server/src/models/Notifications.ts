import { Schema, Types, model } from "mongoose";

type notification = {
  recieverId: Types.ObjectId;
  senderId: Types.ObjectId;
  url: string;
  type: string;
  status: string;
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
  status: {
    type: String,
    default:"Unread",
  },
  senderName: String,
}, { timestamps: true });

export const NotificationModel =  model('Notification', notificationSchema);