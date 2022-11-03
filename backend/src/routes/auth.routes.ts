import { Router } from 'express'
import { signIn } from '../controllers/auth.controllers'
import { SignInSchema } from '../schemas/auth.schemas'
import { validator } from '../middlewares/validator.middleware'

const router = Router()

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.post('/auth/signin', validator(SignInSchema), signIn)

export default router
