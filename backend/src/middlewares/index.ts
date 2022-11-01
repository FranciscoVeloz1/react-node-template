import { validator } from './validator.middleware'
import { verifyToken, isAdminIn } from './auth.middleware'
import { duplicate } from './duplicate.middleware'

export { validator, verifyToken, isAdminIn, duplicate }
