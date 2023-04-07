import mongoose, { Document, Schema, model } from "mongoose";

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

export interface User {
  hn_no: string;
  displayName: string;
  userId: string;
  pictureUrl: string;
  profile: {
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
  };
}

const UserSchema = new Schema<User>({
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

const user = model<User>("user", UserSchema);
export default user;
