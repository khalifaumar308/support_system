import { Schema, model, Model } from "mongoose";


interface school {
  email: string;
  name: string;
  students: number;
  onboarded: Boolean;
  trained: Boolean;
  currentTerm: string;
  onboardDate: Date;
  trainDate: Date;
  address: string;
  package: number;
  payment: boolean[];
  affiliatePercentage: number;
};

interface schoolMethods {
  totalPayable(): Number;
}

type schoolModel = Model<school, {}, schoolMethods>

const schoolSchema = new Schema<school, schoolModel, schoolMethods>({
  name: String,
  email: String,
  address: String,
  onboarded: { type:Boolean, default:false },
  trained: { type:Boolean, default:false },
  onboardDate: Date,
  trainDate: Date,
  currentTerm: String,
  students: Number,
  package: { type:Number, default:0 },
  payment: [Boolean],
  affiliatePercentage: {
    type: Number,
    default:0
  }
});

schoolSchema.method("totalPayable", function totalPayable() {
  return this.package * this.students;
})

export default model("schools", schoolSchema);