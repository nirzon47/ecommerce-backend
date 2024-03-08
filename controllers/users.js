import { userModel } from '../models/users.js'

const registration = async (req, res) => {
	try {
		const user = new userModel(req.body)
		const { _id } = await user.save()

		res.status(200).json({
			success: true,
			message: 'User registration successful',
			id: '' + _id,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'User registration failed',
			error,
		})
	}
}

const usersController = {
	registration,
}

export default usersController
