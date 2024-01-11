export type user = { name: string, email: string, token: 'string', role: string }
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
  payment: boolean[];
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
  payment?: boolean[]
}

export type lschool = {
  message: string
}