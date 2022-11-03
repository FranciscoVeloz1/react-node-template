import { Router } from 'express'
import { validator } from '../middlewares/validator.middleware'
import * as s from '../schemas/company.schemas'
import * as controller from '../controllers/company.controllers'

const router = Router()

router.get('/company', controller.list)
router.post('/company', validator(s.CompanySchema), controller.create)
router.get('/company/:id_company', validator(s.GetCompanySchema), controller.get)
router.put('/company/:id_company', validator(s.CompanySchema), controller.update)
router.delete('/company/:id_company', validator(s.GetCompanySchema), controller.deleteData)

export default router
