import { Router } from 'express'
import usersController from '../controllers/users.js'

const router = Router()

// Add User
router.post('/registration', usersController.registration)

// Login
router.post('/login', usersController.login)

// Logout
router.post('/logout', (req, res) => {
	res.json({
		message: 'User logout',
	})
})

export default router
