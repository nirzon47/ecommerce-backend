import { Router } from 'express'
import productsController from '../controllers/products.js'
import upload from '../middlewares/productsMulterConfig.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

// Add Product
router.post(
	'/',
	[upload.single('productImage'), tokenVerification(['admin', 'sellers'])],
	productsController.addProduct
)

// Get Product by ID
router.get('/:pID', productsController.getProduct)

// Add Rating
router.post(
	'/ratings/:pID',
	tokenVerification(['buyer']),
	productsController.addRating
)

// Edit Rating
router.patch(
	'/ratings/:pID',
	tokenVerification(['buyer']),
	productsController.editRating
)

// Like or Dislike
router.post(
	'/:pID/:action',
	tokenVerification(['buyer']),
	productsController.likeDislikeProduct
)

export default router
