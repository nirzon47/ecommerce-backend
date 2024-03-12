import { Router } from 'express'
import productsController from '../controllers/products.js'
import upload from '../middlewares/productsMulterConfig.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

router.post(
	'/',
	[upload.single('productImage'), tokenVerification(['admin', 'sellers'])],
	productsController.addProduct
)

router.get('/:pID', productsController.getProduct)

router.post(
	'/:pID/:action',
	tokenVerification(['buyer']),
	productsController.likeDislikeProduct
)

export default router
