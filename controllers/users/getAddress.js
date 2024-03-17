import { userModel } from '../../models/users.js'

export const getAddress = async (req, res) => {
	try {
		const userID = req.user._id

		const user = await userModel.findById(userID, {
			address: 1,
		})

		if ('{}' === JSON.stringify(user.address)) {
			throw new Error('No address')
		}

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
