export type user = { name: string, email: string, token: 'string', role: string, id:string }
export type luser = { email: string, password: string };
export type afiliate = {
  email: string;
  name: string;
  phone: string;
  role?: string;
  schoolsReferred: string[]
}
export type lafiliate = {
  id?: string | false;
}
export type school = {
  email: string;
  name: string;
  students: number;
  onboarded: boolean;
  trained: boolean;
  onboardDate: Date;
  trainDate: Date;
  address: string;
  package: number;
  currentTerm: string;
  payment: boolean[];
  affiliatePercentage: number;
  _id?: string;
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