import { ProductsModel } from '../../models/products.js'

// Controller for adding rating
export const addRating = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id
		// Gets the product ID from the dynamic route
		const productID = req.params.pID
		// Gets the rating and comment from the request body
		const rating = req.body.rating
		const comment = req.body.comment

		// Creates a new rating object
		const ratingObject = {
			user: userID,
			rating,
			comment,
		}

		// If the user has already rated the product, send an error response
		if (req.ratingExists) {
			throw new Error('You have already rated this product')
		}

		// Updates the product with the new rating
		const updatedProduct = await ProductsModel.findByIdAndUpdate(
			productID,
			{ $push: { ratings: ratingObject } },
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Rating added successfully',
			product: updatedProduct.ratings,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Rating addition failed',
		})
	}
}
