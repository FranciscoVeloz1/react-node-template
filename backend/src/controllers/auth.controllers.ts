import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { pool, util } from '../lib'
import { RowDataPacket } from 'mysql2'
import { Request, Response } from 'express'

//Interfaces
import { IUser } from '../interfaces/IUser'

interface IUserData extends RowDataPacket, IUser {
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    //Validating user
    const [users] = await pool.query<IUserData[]>('select * from users where email = ?', [email])
    if (users.length === 0) throw new Error('User not found')

    //Validating password
    const match = await util.matchPassword(password, users[0].password)
    if (!match) throw new Error('Invalid password')

    const token = jwt.sign({ id: users[0].id_user }, SECRET, {
      expiresIn: 30 //24 hours
      // expiresIn: 2592000, //30 days
    })

    return res.status(200).json({
      status: true,
      token,
      data: users[0]
    })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}
