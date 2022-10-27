import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { ZodError } from "zod";
import { pool, util } from "../lib";
import { authSchemas } from "../schemas";
import { Request, Response } from "express";

//Interfaces
import { IUser } from "../interfaces/IUser";

export const signIn = async (req: Request, res: Response) => {
  try {
    authSchemas.signInSchema.parse(req.body);
    const { email, password } = req.body;

    //Validating user
    const [users] = await pool.query<IUser[]>("select * from users where email = ?", [email]);
    if (users.length === 0) throw new Error("User not found");

    //Validating password
    const match = await util.matchPassword(password, users[0].password);
    if (!match) throw new Error("Invalid password");

    const token = jwt.sign({ id: users[0].id }, SECRET, {
      expiresIn: 30, //24 hours
      // expiresIn: 2592000, //30 days
    });

    return res.status(200).json({
      status: true,
      token,
      data: users[0],
    });
  } catch (error) {
    if (error instanceof ZodError) {
      let message: string = "";
      error.issues.forEach((e) => (message += `${e.message}, `));
      return res.status(400).json({ status: false, message: message.substring(0, message.length - 2) });
    }
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message });
    return res.status(400).json({ status: false, message: "Unknow error" });
  }
};
