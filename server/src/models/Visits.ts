import { Schema, model, Types } from "mongoose";

type visits = {
  userId: Types.ObjectId;
  schoolName: string;
  address: string;
  comment: string;
}

const visitsSchema = new Schema<visits>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  schoolName: String,
  address: String,
  comment: String,
}, { timestamps: true });

export const VisitsModel =  model('Visits', visitsSchema);