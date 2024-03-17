import { userModel } from '../../models/users.js'

// Controller for getting address
export const getAddress = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id

		// Get only address from the user
		const user = await userModel.findById(userID, {
			address: 1,
		})

		// If the user has no address, send an error response
		if ('{}' === JSON.stringify(user.address)) {
			throw new Error('No address')
		}

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Get address successfully',
			address: user.address,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Get address failed',
		})
	}
}
