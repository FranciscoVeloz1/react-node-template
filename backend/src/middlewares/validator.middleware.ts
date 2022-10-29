import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validator = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params
    })
    return next()
  } catch (error) {
    if (error instanceof ZodError) {
      let m: string = ''
      error.issues.forEach((e) => (m += `${e.message}, `))
      return res.status(400).json({ status: false, message: m.substring(0, m.length - 2) })
    }
    if (error instanceof Error) return res.status(400).json({ status: false, message: error.message })
    return res.status(400).json({ status: false, message: 'Unknow error' })
  }
}
