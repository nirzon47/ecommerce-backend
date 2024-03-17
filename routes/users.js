import { Router } from 'express'
import usersController from '../controllers/users.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

// Add User
router.post('/registration', usersController.registration)

// Login
router.post('/login', usersController.login)

// Logout
router.post(
	'/logout',
	tokenVerification(['buyer', 'sellers', 'admin']),
	usersController.logout
)

// Add to Wishlist
router.post(
	'/wishlist/:pID',
	tokenVerification(['buyer']),
	usersController.addToWishList
)

// Remove from Wishlist
router.patch(
	'/wishlist/:pID',
	tokenVerification(['buyer']),
	usersController.removeFromWishlist
)

// Get Wishlist
router.get(
	'/wishlist',
	tokenVerification(['buyer']),
	usersController.getWishlist
)

// Add Address
router.post(
	'/address',
	tokenVerification(['buyer']),
	usersController.addAddress
)

// Edit Address
router.patch(
	'/address',
	tokenVerification(['buyer']),
	usersController.editAddress
)

// Get Address
router.get('/address', tokenVerification(['buyer']), usersController.getAddress)

router.post

export default router
