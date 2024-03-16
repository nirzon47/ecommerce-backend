import { userModel } from '../../models/users.js'

export const getWishlist = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id

		// Finds the user and populates the wishlist array
		const wishlist = await userModel
			// Find the user in the database and only get the wishlist array
			.findById(userID, { wishlist: 1 })
			.populate({
				path: 'wishlist',
				select: 'name price imagePath price',
			})

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Data retrieved successfully',
			wishlist: wishlist.wishlist,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Get wish list failed',
		})
	}
}
