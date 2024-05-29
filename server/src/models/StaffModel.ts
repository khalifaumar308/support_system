import { Schema, model, Types } from "mongoose";

type staff = {
  name: string;
  email: string;
  rank: string;
  userId: Types.ObjectId; // Reference to the User Model
  address: string;
}

const staffSchema = new Schema<staff>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rank: { type: String, required:true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, required: true },
})

export default  model<staff>("Staff", staffSchema);