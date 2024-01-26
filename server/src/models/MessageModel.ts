import { Schema, model, Types } from "mongoose";

export type message = {
  senderId: Types.ObjectId;
  recieverId: Types.ObjectId;
  senderName: string;
  title: string;
  content: string;
  read: boolean;
}

const messageSchema = new Schema<message>({
  recieverId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  senderId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: String,
  content: String,
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const MessageModel = model('Message', messageSchema);

export default MessageModel;