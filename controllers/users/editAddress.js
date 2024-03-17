import { userModel } from '../../models/users.js'

// Controller for editing address
export const editAddress = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id

		// Make an object from the request body
		const address = {
			street: req.body.street,
			city: req.body.city,
			district: req.body.district,
			state: req.body.state,
			country: req.body.country,
			zip: req.body.zip,
		}

		// If the user has no address, send an error response
		const user = await userModel.findById(userID)

		// TODO: Refactor
		if (JSON.stringify({}) === JSON.stringify(user.address)) {
			throw new Error('No address, add address to patch')
		}

		// Gets the address object to make a query
		const updatedAddress = Object.entries(address)
			.filter(([key, value]) => value !== undefined)
			.reduce((obj, [key, value]) => {
				obj[`address.${key}`] = value
				return obj
			}, {})

		// Updates the user with the new address
		const updatedUser = await userModel.findByIdAndUpdate(
			userID,
			{ $set: updatedAddress },
			{ new: true, fields: { address: 1 } }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Address updated successfully',
			data: updatedUser,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Edit address failed',
		})
	}
}
