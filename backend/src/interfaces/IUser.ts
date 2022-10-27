import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  id: number;
  user: string;
  email: string;
  fullname: string;
  password: string;
  fk_role: number;
}
