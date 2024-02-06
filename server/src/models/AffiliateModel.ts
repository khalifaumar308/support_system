import { Schema, model, Types } from "mongoose";

type schoolReferred = {
  schoolId: string,
  percentage: Number,
}

type afiliate = {
  userId: Types.ObjectId,
  email: string;
  name: string;
  phone: string;
  schoolsReferred: [schoolReferred];
  location: string;
};

const schoolReferredSchema = new Schema<schoolReferred>({
  schoolId: String,
  percentage: Number
})

const affiliateSchema = new Schema<afiliate>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
  location: {
    type: String,
    required: true,
    default:'Kano',
  },
  schoolsReferred: [ schoolReferredSchema ],//[schoolName, percentageOffer] 
});

export default model<afiliate>("Affiliate", affiliateSchema)