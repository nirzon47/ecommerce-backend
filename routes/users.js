import { Router } from 'express'
import usersController from '../controllers/users.js'

const router = Router()

router.post('/registration', usersController.registration)

router.post('/login', usersController.login)

router.post('/logout', (req, res) => {
	res.json({
		message: 'User logout',
	})
})

export default router
