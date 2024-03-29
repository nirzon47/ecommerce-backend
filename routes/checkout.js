import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import checkoutController from '../controllers/checkout.js'

const router = Router()

// Checkout
router.post('/', tokenVerification(['buyer']), checkoutController.checkoutCart)

// Confirm Payment
router.post('/confirm', checkoutController.confirmPayment)

export default router
