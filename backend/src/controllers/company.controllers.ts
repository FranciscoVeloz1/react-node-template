import { pool } from '../lib'
import { Request, Response } from 'express'
import { OkPacket, RowDataPacket } from 'mysql2'
import { ICompany } from '../interfaces/ICompany'
import * as t from '../schemas/company.schemas'

interface ICompanyData extends RowDataPacket, ICompany {}

//List
export const list = async (_req: Request, res: Response) => {
  try {
    const [company] = await pool.query<ICompanyData[]>('select * from company')
    if (company.length === 0) throw new Error('Companies not found')

    return res.status(200).json({ status: true, data: company })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Get
export const get = async (req: Request<t.GetCompanyType, any, any>, res: Response) => {
  try {
    const { id_company } = req.params
    const [company] = await pool.query<ICompanyData[]>('select * from company where id_company = ?', [id_company])
    if (company.length === 0) throw new Error('Company not found')

    return res.status(200).json({ status: true, data: company[0] })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Create
export const create = async (req: Request<any, any, t.CompanyType>, res: Response) => {
  try {
    const result = await pool.query<OkPacket>('insert into company set ?', [req.body])
    return res.status(200).json({ status: true, data: result[0].insertId })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Update
export const update = async (req: Request<t.GetCompanyType, any, t.CompanyType>, res: Response) => {
  try {
    const { id_company } = req.params
    await pool.query('update company set ? where id_company = ?', [req.body, id_company])
    return res.status(200).json({ status: true })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}

//Delete
export const deleteData = async (req: Request<t.GetCompanyType>, res: Response) => {
  try {
    const { id_company } = req.params
    await pool.query('delete from company where id_company = ?', [id_company])
    return res.status(200).json({ status: true })
  } catch (error) {
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}
