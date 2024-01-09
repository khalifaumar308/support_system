import { Schema, model, Model } from "mongoose";


interface school {
  email: string;
  name: string;
  students: number;
  onboarded: Boolean;
  trained: Boolean;
  onboardDate: Date;
  trainDate: Date;
  address: string;
  package: number;
  payment: boolean[]
};

interface schoolMethods {
  totalPayable(): Number;
}

type schoolModel = Model<school, {}, schoolMethods>

const schoolSchema = new Schema<school, schoolModel, schoolMethods>({
  name: String,
  email: String,
  address: String,
  onboarded: Boolean,
  trained: Boolean,
  onboardDate: Date,
  students: Number,
  package: Number,
  payment: [Boolean]
});

schoolSchema.method("totalPayable", function totalPayable() {
  return this.package * this.students;
})

export default model("schools", schoolSchema);