import { Router } from 'express'
import * as controller from '../controllers/company.controllers'
import { validator } from '../middlewares/validator.middleware'
import * as s from '../schemas/company.schemas'

const router = Router()

router.get('/company', controller.list)
router.post('/company', validator(s.CompanySchema), controller.create)

//@ts-ignore
router.get('/company/:id_company', validator(s.GetCompanySchema), controller.get)
//@ts-ignore
router.put('/company/:id_company', validator(s.CompanySchema), controller.update)
//@ts-ignore
router.delete('/company/:id_company', validator(s.GetCompanySchema), controller.deleteData)

export default router
