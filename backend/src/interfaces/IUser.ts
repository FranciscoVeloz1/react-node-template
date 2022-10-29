export interface IUser {
  id_user: number;
  user: string;
  email: string;
  fullname: string;
  password: string;
  fk_role: number;
  fk_company: number;
}
