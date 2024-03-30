import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import couponController from '../controllers/coupon.js'

const router = Router()

// Create Coupon
router.post('/', tokenVerification(['admin']), couponController.createCoupon)

// Edit Coupon
router.patch('/:cID', tokenVerification(['admin']), couponController.editCoupon)

// Get Coupons
router.get('/', couponController.getCoupons)

export default router
