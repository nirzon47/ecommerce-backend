import { Router } from 'express'
import cartController from '../controllers/cart.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

router.post('/', tokenVerification(['buyer']), cartController.addToCart)

export default router
