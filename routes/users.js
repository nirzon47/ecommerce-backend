import { Router } from 'express'

const router = Router()

router.post('/registration', (req, res) => {
	res.json({
		message: 'User registration',
	})
})

export default router
