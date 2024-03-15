import { ProductsModel } from '../../models/products.js'

// Controller for getting detailed product list
export const getProduct = async (req, res) => {
	try {
		// Get the product ID from the request
		const productID = req.params.pID

		// Finds the product in the database and populates the likes and dislikes arrays
		const product = await ProductsModel.findById(productID).populate([
			{ path: 'likes', select: 'firstName lastName' },
			{ path: 'dislikes', select: 'firstName lastName' },
		])

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product fetched successfully',
			product,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: 'Interaction failed',
		})
	}
}
