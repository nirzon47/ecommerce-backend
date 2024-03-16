import { userModel } from '../../models/users.js'

export const removeFromWishlist = async (req, res) => {
	try {
		const userID = req.user._id
		const productID = req.params.pID

		const user = await userModel.findById(userID)

		if (!user.wishlist.includes(productID)) {
			throw new Error('Product not in wish list')
		}

		const newUser = await userModel.findByIdAndUpdate(
			userID,
			{ $pull: { wishlist: productID } },
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product removed from wish list successfully',
			wishlist: newUser.wishlist,
		})
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Remove from wish list failed',
		})
	}
}
