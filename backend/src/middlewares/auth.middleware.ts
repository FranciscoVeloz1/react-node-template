import jwt from 'jsonwebtoken'
import { pool } from '../lib'
import { SECRET } from '../config'
import { RowDataPacket } from 'mysql2'
import { IUser } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'

interface IUserData extends RowDataPacket, IUser {}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'] as string
    if (!token) throw new Error('Access denied')

    const decoded = jwt.verify(token, SECRET) as IUser
    req.userId = decoded.id_user

    const [user] = await pool.query<IUserData[]>('select * from users where id_user = ?', [req.userId])
    if (user.length === 0) throw new Error('User not found')

    next()
  } catch (error) {
    if (error instanceof Error) res.status(401).json({ status: false, message: error.message })
  }
}

export const isAdminIn = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const [user] = await pool.query<IUserData[]>('select * from users where id_user = ?', [req.userId])
    if (user.length === 0) throw new Error('User not found')
    if (user[0].fk_role !== 2) throw new Error('Unauthorized')

    next()
  } catch (error) {
    if (error instanceof Error) res.status(401).json({ status: false, message: error.message })
  }
}
