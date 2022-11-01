import { pool } from '../lib'
import { RowDataPacket } from 'mysql2'
import { IUser } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'
import * as t from '../schemas/user.schemas'

interface IUserData extends RowDataPacket, IUser {}

export const duplicate = async (
  req: Request<t.GetUserType, any, t.CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const [user] = await pool.query<IUserData[]>('select * from users where user = ?', [req.body.user])
    if (user.length > 0 && parseInt(req.params.id_user) !== user[0].id_user)
      throw new Error('The user already exists')

    const [email] = await pool.query<IUserData[]>('select * from users where email = ?', [req.body.email])
    if (email.length > 0 && parseInt(req.params.id_user) !== email[0].id_user)
      throw new Error('The email already exists')

    next()
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ status: false, message: error.message })
  }
}
