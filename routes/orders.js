import { Router } from 'express'
import { getOrders } from '../controllers/orders.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

// Get Orders
router.get('/', tokenVerification(['buyer']), getOrders)

export default router
