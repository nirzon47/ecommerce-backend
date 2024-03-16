import { userModel } from '../../models/users.js'

// Controller for adding address
export const addAddress = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id

		// Destructure the address from the request body
		const address = { ...req.body }

		// Updates the user with the new address
		const updatedUser = await userModel.findByIdAndUpdate(
			userID,
			// Sets the address in the address sub-collection of the user document
			{ $set: { address: address } },
			// Gets only the updated address from the user document
			{ new: true, fields: { address: 1 } }
		)

		// Upon success, send a success response
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
