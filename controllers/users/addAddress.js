import { userModel } from '../../models/users.js'

export const addAddress = async (req, res) => {
	try {
		const userID = req.user._id
		console.log(userID)

		const address = { ...req.body }

		const updatedUser = await userModel.findByIdAndUpdate(
			userID,
			{ $set: { address: address } },
			{ new: true, fields: { address: 1 } }
		)

		res.status(200).json({
			success: true,
			message: 'Address added successfully',
			data: updatedUser,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Add address failed',
		})
	}
}
