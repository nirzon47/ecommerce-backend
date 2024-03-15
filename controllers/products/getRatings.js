import { ProductsModel } from '../../models/products.js'

// Controller for getting all the ratings
export const getRatings = async (req, res) => {
	try {
		const productID = req.params.pID

		const products = await ProductsModel.findById(productID).populate({
			path: 'ratings.user',
			select: 'firstName lastName',
		})

		res.status(200).json({
			success: true,
			message: 'Ratings fetched successfully',
			ratings: products.ratings,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Ratings fetch failed',
		})
	}
}
