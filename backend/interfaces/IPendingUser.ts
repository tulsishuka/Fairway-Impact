export interface IPendingUser {
  name: string;
  email: string;
  password: string;
  otp: string;
  otpExpires: Date;
}