import { Schema, model } from "mongoose";

interface user {
  email: string;
  name: string;
  role: string;
  password: string;
  refreshToken: string[]
};


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
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: [String],
})


export default model("User", userSchema);