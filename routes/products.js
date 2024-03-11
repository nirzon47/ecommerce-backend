import { Router } from 'express'
import productsController from '../controllers/products.js'
import upload from '../middlewares/productsMulterConfig.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

router.post(
	'/',
	[upload.single('productImage'), tokenVerification],
	productsController.addProduct
)

export default router
