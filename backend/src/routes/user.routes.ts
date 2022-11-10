import { Router } from 'express'
import { validator, duplicate } from '../middlewares'
import * as s from '../schemas/user.schemas'
import * as controller from '../controllers/user.controllers'

const router = Router()

// router.get('/users', [verifyToken], controller.list)
// router.post('/users', [verifyToken, validator(s.CreateUserSchema), duplicate], controller.create)
// router.get('/users/:id_user', [verifyToken, validator(s.GetUserSchema)], controller.get)
// router.put('/users/:id_user', [verifyToken, validator(s.UpdateUserSchema), duplicate], controller.update)
// router.delete('/users/:id_user', [verifyToken, validator(s.GetUserSchema)], controller.deleteData)

router.get('/users', controller.list)
router.post('/users', [validator(s.CreateUserSchema), duplicate], controller.create)
router.get('/users/:id_user', [validator(s.GetUserSchema)], controller.get)
router.put('/users/:id_user', [validator(s.UpdateUserSchema), duplicate], controller.update)
router.delete('/users/:id_user', [validator(s.GetUserSchema)], controller.deleteData)

export default router
