import { userModel } from '../../models/users.js'

export const removeFromWishlist = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id
		// Get the product ID from the dynamic route
		const productID = req.params.pID

		// Finds the user in the database
		const user = await userModel.findById(userID)

		// Checks if the product is already in the wishlist
		if (!user.wishlist.includes(productID)) {
			throw new Error('Product not in wish list')
		}

		// Removes the product from the wishlist
		await userModel.findByIdAndUpdate(userID, {
			$pull: { wishlist: productID },
		})

		// Finds the user and populates the wishlist array
		const wishlist = await userModel
			.findById(userID, { wishlist: 1 })
			.populate({ path: 'wishlist', select: 'name price' })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product removed from wish list successfully',
			wishlist: wishlist.wishlist,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Remove from wish list failed',
		})
	}
}
