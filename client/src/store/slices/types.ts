export type user = { name: string, email: string, token: 'string', role: string, id:string }
export type luser = { email: string, password: string };
export type afiliate = {
  email: string;
  name: string;
  phone: string;
  role?: string;
  address?: string;
  schoolsReferred: {schoolId:string, percentage:number}[];
  _id?: string;
}
export type lafiliate = {
  id?: string | false;
}
export type school = {
  email: string;
  name: string;
  students: number;
  onboarded?: boolean;
  trained?: boolean;
  onboardDate?: Date;
  trainDate?: Date;
  address: string;
  package?: number;
  currentTerm: string;
  payment?: boolean[];
  affiliatePercentage?: number;
  _id?: string;
  id?: string;
  totalPayable?: string;
}

export type schoolUpdate = {
  id: string;
  students?: number;
  onboarded?: boolean;
  trained?: boolean;
  onboardDate?: Date;
  trainDate?: Date;
  address?: string;
  package?: number;
  currentTerm?: string;
  payment?: boolean[];
  affiliatePercentage?: number;
}

export type lschool = {
  message: string
}

export type visits = {
  userId: string;
  schoolName: string;
  address: string;
  comment: string;
  _id?: string;
  createdAt?: Date
}

export type affilaiteSchool = {
  id: string,
  schoolData: school
}

export type notification = {
  recieverId: string;
  senderId: string;
  url: string;
  type: string;
  status: string;
  senderName: string;
}

export type message = {
  recieverId: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  title: string;
  read: boolean;
  _id?:string
}