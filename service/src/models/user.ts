import mongoose, { Document } from "mongoose";

export interface ResponseHN {
  responseCode: number;
  responseMsg: string;
  requestTime: string;
  responseTime: string;
  detail: Detail;
}

export interface Detail {
  hn: string;
  titleTH: string;
  firstNameTH: string;
  lastNameTH: string;
  titleEN: string;
  firstNameEN: string;
  lastNameEN: string;
  gender: string;
  birthDate: string;
  mobilePhone: string;
  email: string;
  nationality: string;
  religion: string;
}

export class User extends Document {}

const UserSchema = new mongoose.Schema({
  hn_no: String,
  displayName: String,
  userId: String,
  pictureUrl: String,
  profile: {
    hn: String,
    titleTH: String,
    firstNameTH: String,
    lastNameTH: String,
    titleEN: String,
    firstNameEN: String,
    lastNameEN: String,
    gender: String,
    birthDate: String,
    mobilePhone: String,
    email: String,
    nationality: String,
    religion: String,
  },
});

export default mongoose.model("user", UserSchema);
