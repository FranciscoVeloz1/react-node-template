import { Router } from 'express'
import { authControllers } from '../controllers'
import { validator } from '../middlewares/validator.middleware'
import { signInSchema } from '../schemas/auth.schemas'

const router = Router()

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.post('/auth/signin', validator(signInSchema), authControllers.signIn)

export default router
