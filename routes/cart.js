import { Router } from 'express'
import cartController from '../controllers/cart.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

// Add to cart
router.post('/', tokenVerification(['buyer']), cartController.addToCart)

// Remove from cart
router.patch('/', tokenVerification(['buyer']), cartController.removeFromCart)

// Change quantity
router.patch(
	'/quantity',
	tokenVerification(['buyer']),
	cartController.changeQuantity
)

// Get cart
router.get('/', tokenVerification(['buyer']), cartController.getCart)

export default router
