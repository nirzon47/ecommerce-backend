import { userModel } from '../../models/users.js'

// Controller for user registration
export const registration = async (req, res) => {
	try {
		// Create a new user model
		const user = new userModel(req.body)
		// Save the user to the database
		const { _id } = await user.save()

		// Send a success response
		res.status(200).json({
			success: true,
			message: 'User registration successful',
			_id,
		})
	} catch (error) {
		// Send an error response
		res.status(500).json({
			success: false,
			message: 'User registration failed',
			error,
		})
	}
}
