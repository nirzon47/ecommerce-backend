import { userModel } from '../models/users.js'
import bcrypt from 'bcrypt'

// Controller for user registration
const registration = async (req, res) => {
	try {
		// Create a new user model
		const user = new userModel(req.body)
		// Save the user to the database
		const { _id } = await user.save()

		// Send a success response
		res.status(200).json({
			success: true,
			message: 'User registration successful',
			id: '' + _id,
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

// Controller for user login
const login = async (req, res) => {
	try {
		// Finds the user in the database
		const user = await userModel.findOne({ email: req.body.email })

		// If the user does not exist, send an error response
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		// If the password is correct, send an success response
		if (await user.isValidPassword(req.body.password)) {
			// Send a success response
			return res.status(200).json({
				success: true,
				message: 'Login successful',
				id: '' + user._id,
			})
		}

		// If the password is incorrect, send an error response
		res.status(401).json({
			success: false,
			message: 'Incorrect password',
		})
	} catch (err) {
		// Send an error response
		return res.status(500).json({
			success: false,
			message: 'Login failed',
			error: err.message,
		})
	}
}

const usersController = {
	registration,
	login,
}

export default usersController
