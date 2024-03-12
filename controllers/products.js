import ProductsModel from '../models/products.js'

const addProduct = async (req, res) => {
	try {
		// Adds the form data and file path to the product object
		const product = { ...req.body, imagePath: req.file.path }

		// Creates a new product model and saves it to the database
		const newProduct = new ProductsModel(product)
		await newProduct.save()

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product created successfully',
			product: newProduct,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: 'Product creation failed',
			error,
		})
	}
}

// Controller for product like and dislike
const likeDislikeProduct = async (req, res) => {
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
			message: 'Interaction failed',
			error,
		})
	}
}

// Controller for getting detailed product list
const getProduct = async (req, res) => {
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

const productsController = { addProduct, likeDislikeProduct, getProduct }

export default productsController
