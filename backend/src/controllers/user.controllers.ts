import { pool } from '../lib'
import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser'
import { OkPacket, RowDataPacket } from 'mysql2'
import { CreateProductType } from '../schemas/user.schemas'

interface IUserData extends RowDataPacket, IUser {}

export const list = async (_req: Request, res: Response) => {
  try {
    const [result] = await pool.query<IUserData[]>('select * from users')
    if (result.length === 0) throw new Error('Users not found')

    const users = result.map((r) => {
      const { constructor, ...user } = r
      return user
    })

    return res.status(200).json({ status: true, data: users[0] })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

export const create = async (req: Request<any, any, CreateProductType>, res: Response) => {
  try {
    const result = await pool.query<OkPacket>('insert into users set ?', [req.body])
    return res.status(200).json({ status: true, data: result[0].insertId })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}
