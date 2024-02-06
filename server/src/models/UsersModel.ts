import { Schema, model } from "mongoose";

interface user {
  email: string;
  name: string;
  role: string;
  password: string;
  refreshToken: string[];
  rank: string;
  phone: string;
  schoolsReferred: [schoolReferred];
  location: string;
  department: string;
};
type schoolReferred = {
  schoolId: string,
  percentage: Number,
}
const schoolReferredSchema = new Schema<schoolReferred>({
  schoolId: String,
  percentage: Number
})
const userSchema = new Schema<user>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:['Affiliate', 'Staff', 'Admin']
  },
  rank: {
    type: String,
    default: "Affiliate"
  },

  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
    default:'Kano',
  },
  schoolsReferred: { type: [schoolReferredSchema], required: false },
  department: {
    type: String,
    required: false,
    enum:['Data Capture', 'Bussiness', 'Development']
  },
  refreshToken: [String],
})

export default model("User", userSchema);