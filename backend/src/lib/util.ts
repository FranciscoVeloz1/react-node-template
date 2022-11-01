import bcrypt from 'bcryptjs'
import { IResponse } from '../interfaces/IResponse'

interface IEncrypt extends IResponse {
  data?: string
}

export const encryptPassword = async (password: string): Promise<IEncrypt> => {
  try {
    const salt = await bcrypt.genSalt(10)
    const data = await bcrypt.hash(password, salt)
    return { status: true, data }
  } catch (error) {
    if (error instanceof Error) return { status: false, message: error.message }
    return { status: false, message: 'Unknow error' }
  }
}

export const matchPassword = async (password: string, savedPassword: string) => {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error)
    return false
  }
}
