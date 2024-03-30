import { Router } from 'express'
import { forgotPassword } from '../controllers/forgot.js'

const router = Router()

router.post('/', forgotPassword)

export default router
