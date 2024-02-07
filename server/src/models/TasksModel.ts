import { Schema, model, Types } from "mongoose";

type task = {
  deadline: Date;
  department: string;
  assignedTo: [{ id: Types.ObjectId }];
  status: string;
  type: string;
  createdBy: Types.ObjectId;
  title: string;
  comments: [{ by: Types.ObjectId, comment: string }];
  details: string;
};

const taskSchema = new Schema<task>({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  department: { type: String, enum: ['Affiliates', 'Support', 'Data Capturing', 'Bussiness', 'Software'] },
  assignedTo: [{ id: { type: Schema.Types.ObjectId, ref: 'User' } }],
  status: { type: String, enum: ['In Progress', 'Pending', 'Completed'] },
  type: { type: String, enum: ['Training', 'Support', 'Data Capture', 'Follow Up', 'Software', 'Onboarding'] },
  title: String,
  comments: [{ by: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String }],
  details: String,
  deadline: Date,
}, {timestamps:true});

export default  model<task>('Task', taskSchema);