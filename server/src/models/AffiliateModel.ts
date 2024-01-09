import { Schema, model } from "mongoose";

interface afiliate {
  email: string;
  name: string;
  phone: string;
  schoolsReferred: [[string, number]];
};

const affiliateSchema = new Schema<afiliate>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  schoolsReferred: [ [String, Number] ],//[schoolName, percentageOffer] 
});

export default model<afiliate>("Affiliate", affiliateSchema)