import { userModel } from '../../models/users.js'
import jwt from 'jsonwebtoken'

// Controller for user login
export const login = async (req, res) => {
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
			// Create a payload for JWT
			const payload = {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				// TODO: Update the expiration time
				exp: Math.floor((Date.now() + 1000 * 60 * 60 * 2) / 1000),
			}

			// Create a JWT token
			const token = jwt.sign(payload, process.env.JWT_SECRET)

			// Adds the token to the user model
			await userModel.findByIdAndUpdate(
				user._id,
				{ $push: { tokens: token } },
				{ new: true }
			)

			// Send a success response
			return res.status(200).json({
				success: true,
				message: 'Login successful',
				id: '' + user._id,
				token,
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
