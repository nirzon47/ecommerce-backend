import { ProductsModel } from '../../models/products.js'

// Controller for product like and dislike
export const likeDislikeProduct = async (req, res) => {
	try {
		// Get the product ID and user ID from the request
		const productID = req.params.pID
		const userID = req.user._id

		// Find the product in the database
		const product = await ProductsModel.findById(productID)

		// If the product is not found, send an error response
		if (!product) {
			throw new Error('Product not found')
		}

		let message = 'Product liked successfully'

		// Switch case for like and dislike
		switch (req.params.action) {
			case 'like': {
				if (!product.likes.includes(userID)) {
					// If the user has not liked the product, add the user ID to the likes array
					await ProductsModel.findByIdAndUpdate(productID, {
						$push: { likes: userID },
					})
				} else {
					// If the user has already liked the product, remove the user ID from the likes array
					await ProductsModel.findByIdAndUpdate(productID, {
						$pull: { likes: userID },
					})

					message = 'Removed like from this user'
				}

				break
			}

			case 'dislike': {
				if (!product.dislikes.includes(userID)) {
					await ProductsModel.findByIdAndUpdate(productID, {
						$push: { dislikes: userID },
					})

					message = 'Product disliked successfully'
				} else {
					await ProductsModel.findByIdAndUpdate(productID, {
						$pull: { dislikes: userID },
					})

					message = 'Removed dislike from this user'
				}

				break
			}

			default:
				throw new Error('Invalid action')
		}

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: message,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Interaction failed',
			error,
		})
	}
}
