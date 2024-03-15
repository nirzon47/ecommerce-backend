import { userModel } from '../../models/users.js'

// Controller for user logout
export const logout = async (req, res) => {
	try {
		// Remove the token from the user in the database
		await userModel.findByIdAndUpdate(req.user._id, {
			$pull: { tokens: req.headers.token.split(' ')[1] },
		})

		// Upon success, send a success response
		return res.status(200).json({
			success: true,
			message: 'Logout successful',
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: 'Logout failed',
			error: err.message,
		})
	}
}
