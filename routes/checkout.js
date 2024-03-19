import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import { checkout } from '../controllers/checkout.js'

const router = Router()

router.post('/', tokenVerification(['buyer']), checkout)

export default router
