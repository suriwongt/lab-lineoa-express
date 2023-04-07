import axios from "axios";

export interface Response {
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

export interface Welcome {
  hn_no: string;
  userId: string;
  profile: Profile;
}

export interface Profile {
  hn: string;
  titleTH: string;
  firstNameTH: string;
  lastNameTH: string;
  titleEN: string;
  firstNameEN: string;
  lastNameEN: string;
  gender: string;
  birthDate: Date;
  mobilePhone: string;
  email: string;
  nationality: string;
  religion: string;
}

// export const postProfile = (user: any): Promise<Response> =>
//   axios.post(`http://localhost:3000/api/v1/user`, user).then((res) => res.data);

export const postProfile = (user: any): Promise<Response> =>
  axios.post(`/api/v1/user`, user).then((res) => res.data);

export const getProfile = (userId: string): Promise<Welcome> =>
  axios.get(`/api/v1/user/${userId}`).then((res) => res.data);

export const logoutProfile = (userId: string): Promise<Welcome> =>
  axios.delete(`/api/v1/user/${userId}`).then((res) => res.data);
