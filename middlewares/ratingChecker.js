import { ProductsModel } from '../models/products.js'

export const ratingChecker = async (req, res, next) => {
	try {
		// Get the user ID from the token middleware
		const userID = req.user._id
		// Get the product ID from the request
		const productID = req.params.pID

		// Checks for the rating that has the active user ID as its 'user' key
		const getRating = await ProductsModel.findById(productID, {
			ratings: { $elemMatch: { user: userID } },
		})

		// Passing a new property to the request
		req.ratingExists = getRating.ratings.length > 0 ? true : false

		// Continues to the next middleware
		next()
	} catch (err) {
		// Upon failure, send an error response
		return res.status(500).json({
			success: false,
			message: err.message || 'Rating check failed',
		})
	}
}
