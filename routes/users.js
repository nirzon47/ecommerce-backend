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

export default router
