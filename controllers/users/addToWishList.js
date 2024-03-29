import { userModel } from '../../models/users.js'

// Controller for adding product to wishlist
export const addToWishList = async (req, res) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id
		// Get the product ID from the dynamic route
		const productID = req.params.pID

		// Checks if the product is already in the wishlist
		const user = await userModel.findById(userID)
		if (user.wishlist.includes(productID)) {
			throw new Error('Product already in wish list')
		}

		// Adds the product to the wishlist array
		await userModel.findByIdAndUpdate(userID, {
			$push: { wishlist: productID },
		})

		// Finds the user and populates the wishlist array
		const wishlist = await userModel
			.findById(userID, { wishlist: 1 })
			.populate({ path: 'wishlist', select: 'name price imagePath' })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product added to wish list successfully',
			wishlist: wishlist.wishlist,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Add to wish list failed',
		})
	}
}
