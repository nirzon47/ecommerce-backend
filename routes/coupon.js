import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import couponController from '../controllers/coupon.js'

const router = Router()

// Create Coupon
router.post('/', tokenVerification(['admin']), couponController.createCoupon)

export default router
