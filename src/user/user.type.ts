// 입출력 DTO 정의

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  name: string;
  password: string;
};

export type UserInfo = {
  userId: number;
  uuid: string;
  name: string;
  email: string;
};

export type LoginUserInfo = {
  uuid: string;
  name: string;
  email: string;
  lastLoginDt: Date;
  photoFileName: string;
};

export type AuthToken = {
  access_token: string;
};
