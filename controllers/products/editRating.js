import { ProductsModel } from '../../models/products.js'

// Controller for editing rating
export const editRating = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id
		// Gets the product ID from the dynamic route
		const productID = req.params.pID

		// Gets the rating and comment from the request body
		const rating = req.body.rating
		const comment = req.body.comment

		// If the user has not rated the product, send an error response
		if (!req.ratingExists) {
			throw new Error('Rating not found')
		}

		// Updates the product with the new rating
		const updatedProduct = await ProductsModel.findByIdAndUpdate(
			productID,
			{
				// Updates the rating and comment of the rating that has the user key same as the active user in userID
				$set: {
					'ratings.$[elem].rating': rating,
					'ratings.$[elem].comment': comment,
				},
			},
			// Filters the ratings array to only include the rating that has the user key same as the active user in userID
			{ arrayFilters: [{ 'elem.user': userID }], new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Rating edited successfully',
			product: updatedProduct.ratings,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Rating edit failed',
		})
	}
}
