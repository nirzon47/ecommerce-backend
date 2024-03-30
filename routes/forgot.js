import { Router } from 'express'
import { forgotPassword } from '../controllers/forgot.js'
import { resetPassword } from '../controllers/forgot.js'

const router = Router()

router.post('/', forgotPassword)

router.post('/:token', resetPassword)

export default router
