import { Router } from 'express'
import { validator, isAdminIn } from '../middlewares'
import * as s from '../schemas/user.schemas'
import * as controller from '../controllers/user.controllers'

const router = Router()

router.get('/users', isAdminIn, controller.list)
router.post('/users', validator(s.CreateUserSchema), controller.create)

//@ts-ignore
router.get('/users/:id_user', validator(s.GetUserSchema), controller.get)
//@ts-ignore
router.put('/users/:id_user', validator(s.UpdateUserSchema), controller.update)
//@ts-ignore
router.delete('/users/:id_user', validator(s.GetUserSchema), controller.deleteData)

export default router
