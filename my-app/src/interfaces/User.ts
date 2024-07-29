export type User = {
  _id?: string | undefined;
  name?: string;
  email?: string;
  username: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  money?: Number;
  role?: string;
  avatar?: string;
};
