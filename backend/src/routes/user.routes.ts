import { Router } from 'express'
import * as controller from '../controllers/user.controllers'
import { validator } from '../middlewares/validator.middleware'
import * as s from '../schemas/user.schemas'

const router = Router()

router.get('/users', controller.list)
router.post('/users', validator(s.CreateUserSchema), controller.create)

//@ts-ignore
router.get('/users/:id_user', validator(s.GetUserSchema), controller.get)
//@ts-ignore
router.put('/users/:id_user', validator(s.UpdateUserSchema), controller.update)
//@ts-ignore
router.delete('/users/:id_user', validator(s.GetUserSchema), controller.deleteData)

export default router
