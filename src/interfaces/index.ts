/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import * as Sequelize from "sequelize";

declare global {
  namespace Express {
      interface Request {
          user? : Record<string, any>
      }
  }
}
export interface ErrorResponse {
  code: number;
  message: string;
  status: string;
}

export interface ResponseInterface {
  code?: number;
  data?: object;
  status: string;
  message?: string;
}

export interface UserPayload {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  password: string;
  isEmailVerified: string;
  isActive: string;
  resetToken: string;
  emailPhone?: string;
}

export interface OtpPayload {
  id?: number;
  user: string;
  otp: string;
  expiration: Date
}


export interface UserModel extends Sequelize.Model<UserModel, UserPayload> {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  password: string;
  isEmailVerified: string;
  isActive: string;
  resetToken: string;
  emailPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OtpModel extends Sequelize.Model<OtpModel, OtpPayload> {
  id: number;
  user: string;
  otp: string;
  expiration: Date;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseType {
  dataValues?:  {
      id: string;
      password: string;
      email: string;
      lastName: string;
      firstName: string;
      units: number;
      role: string;
      isEmailVerified: boolean;
      isActive: boolean;
      expiration: Date
    }
}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}
