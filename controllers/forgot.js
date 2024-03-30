import { tokenModel } from '../models/token.js'
import { userModel } from '../models/users.js'
import { sendEmail } from '../utils/sendEmail.js'
import { customAlphabet } from 'nanoid'

// Controller for forgot password
export const forgotPassword = async (req, res) => {
	try {
		// Gets the email from the request body
		const { email } = req.body

		// Finds the user in the database
		const user = await userModel.findOne({ email })

		// If the user does not exist, send an error response
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		// Generates a token and expiry date
		const nanoid = customAlphabet('1234567890', 6)
		const token = nanoid()
		const expiry = new Date(Date.now() + 10 * 60 * 1000)

		await tokenModel.create({ token, user: user._id, expiry })

		sendEmail(
			email,
			'Password Reset Link',
			`<a href="http://localhost:5000/api/v1/forgot/${token}">Reset Password</a>`
		)

		res.status(200).json({
			success: true,
			message: 'Password reset link sent to your email',
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Forgot password failed',
		})
	}
}

// Controller for reset password

export const resetPassword = async (req, res) => {
	try {
		// Gets the token from the request params
		const token = req.params.token
		// Gets the password from the request body
		const { password } = req.body

		// Checks if the token exists
		const checkToken = await tokenModel.findOne({ token })

		// If the token does not exist, send an error response
		if (!checkToken) {
			return res.status(404).json({
				success: false,
				message: 'Token not found',
			})
		}

		// If the token has expired, send an error response
		if (checkToken.expiry < Date.now()) {
			return res.status(404).json({
				success: false,
				message: 'Token expired',
			})
		}

		// If the token is valid, update the password
		const user = await userModel.findById(checkToken.user)

		user.password = password
		await user.save()

		// Delete the token
		await tokenModel.findByIdAndDelete(checkToken._id)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Password reset successful',
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Reset password failed',
		})
	}
}
