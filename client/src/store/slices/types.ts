export type user = { name: string, email: string, token: 'string', role: string }
export type luser = { email: string, password: string };
export type afiliate = {
  email: string;
  name: string;
  phone: string;
  schoolsReferred: string[]
}
export type lafiliate = {
  id?: string;
}