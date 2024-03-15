import { ProductsModel } from '../../models/products.js'

// Controller for deleting ratings
export const deleteRating = async (req, res) => {
	try {
		// Gets the product ID from the dynamic route
		const productID = req.params.pID
		// Gets the user ID from the middleware
		const userID = req.user._id

		// If the user has not rated the product, send an error response
		if (!req.ratingExists) {
			throw new Error('Rating not found')
		}

		// Pulls the rating that has the user key same as the active user in userID
		const updatedProduct = await ProductsModel.findByIdAndUpdate(
			productID,
			{
				$pull: { ratings: { user: userID } },
			},
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Rating deleted successfully',
			product: updatedProduct.ratings,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Rating deletion failed',
		})
	}
}
