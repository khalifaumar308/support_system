import { Schema, model, Model } from "mongoose";

export type COMPLAINCOMMENT = { by: string, date: string, comment: string }
export interface COMPLAIN {
  schoolId: string;
  affiliateId: string;
  issue: string;
  status: string;
  comments: [
    COMPLAINCOMMENT
  ] | []
}

const ComplainSchema = new Schema<COMPLAIN>({
  schoolId: { type: String, required: true },
  affiliateId: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, required: true },
  comments: [{
    by: { type: String, required: true },
    date: { type: String, required: true },
    comment: { type: String, required: true }
  }]
}, { timestamps: true });

export default model("complain", ComplainSchema)