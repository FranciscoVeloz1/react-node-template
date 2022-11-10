import { pool } from '../lib'
import { util } from '../lib'
import { Request, Response } from 'express'
import { IUserView } from '../interfaces/IUser'
import { OkPacket, RowDataPacket } from 'mysql2'
import * as t from '../schemas/user.schemas'

interface IUserData extends RowDataPacket, IUserView {}

const QUERY = 'select * from users, company, roles where fk_role = id_role && fk_company = id_company'

//List
export const list = async (req: Request<any, any, any, t.GetQueryUserType>, res: Response) => {
  try {
    const [result] = await pool.query<IUserData[]>(QUERY)
    if (result.length === 0) throw new Error('Users not found')

    const resPerPage = 10

    //Pagination
    const numOfResults = result.length
    const numOfPages = Math.ceil(numOfResults / resPerPage)
    let page: number = parseInt(req.query.page)

    if (page > numOfPages) res.json({ status: true, data: result, pagination: { numOfPages } })
    else if (page < 1) res.json({ status: true, data: result, pagination: { numOfPages: 1 } })

    const startingLimit = (page - 1) * resPerPage

    const [result2] = await pool.query<IUserData[]>(`${QUERY} LIMIT ${startingLimit},${resPerPage}`)

    let iterator = page - 10 < 1 ? 1 : page - 10
    let endingLink = iterator + 9 <= numOfPages ? iterator + 9 : page + (numOfPages - page)

    if (endingLink < page + 9) iterator -= page + 9 - numOfPages

    const users = result2.map((r) => {
      const { password, ...user } = r
      return user
    })

    //Response
    return res.status(200).json({
      status: true,
      data: users,
      pagination: {
        page,
        iterator,
        endingLink,
        numOfPages
      }
    })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Get
export const get = async (req: Request<t.GetUserType, any, any, t.GetQueryUserType>, res: Response) => {
  try {
    const { id_user } = req.params
    const query = `${QUERY} && id_user = ?`
    const [result] = await pool.query<IUserData[]>(query, [id_user])
    if (result.length === 0) throw new Error('User not found')

    const { password, ...user } = result[0]

    return res.status(200).json({ status: true, data: user })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Create
export const create = async (req: Request<any, any, t.CreateUserType>, res: Response) => {
  try {
    const encrypt = await util.encryptPassword(req.body.password)
    if (!encrypt.status) throw new Error(encrypt.message)
    req.body.password = encrypt.data!

    const result = await pool.query<OkPacket>('insert into users set ?', [req.body])
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

    if (req.body.password) {
      const encrypt = await util.encryptPassword(req.body.password)
      if (!encrypt.status) throw new Error(encrypt.message)
      req.body.password = encrypt.data
    }

    console.log(req.body)
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
