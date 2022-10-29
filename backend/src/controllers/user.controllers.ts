import { pool } from '../lib'
import { util } from '../lib'
import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser'
import { OkPacket, RowDataPacket } from 'mysql2'
import * as t from '../schemas/user.schemas'

interface IUserData extends RowDataPacket, IUser {}

//List
export const list = async (_req: Request, res: Response) => {
  try {
    const [users] = await pool.query<IUserData[]>(
      'select id_user, user, email, fullname, fk_role, fk_company from users'
    )
    if (users.length === 0) throw new Error('Users not found')

    return res.status(200).json({ status: true, data: users })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Get
export const get = async (req: Request<t.GetUserType, any, any>, res: Response) => {
  try {
    const { id_user } = req.params
    const [users] = await pool.query<IUserData[]>(
      'select id_user, user, email, fullname, fk_role, fk_company from users where id_user = ?',
      [id_user]
    )
    if (users.length === 0) throw new Error('User not found')

    return res.status(200).json({ status: true, data: users[0] })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Create
export const create = async (req: Request<any, any, t.CreateUserType>, res: Response) => {
  try {
    const password = await util.encryptPassword(req.body.password)
    const newUser = { ...req.body, password }

    const result = await pool.query<OkPacket>('insert into users set ?', [newUser])
    return res.status(200).json({ status: true, data: result[0].insertId })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Update
export const update = async (req: Request<t.GetUserType, any, t.UpdateUserType>, res: Response) => {
  try {
    const { id_user } = req.params
    console.log(id_user)
    await pool.query('update users set ? where id_user = ?', [req.body, id_user])
    return res.status(200).json({ status: true })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Delete
export const deleteData = async (req: Request<t.GetUserType>, res: Response) => {
  try {
    const { id_user } = req.params
    await pool.query('delete from users where id_user = ?', [id_user])
    return res.status(200).json({ status: true })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}
