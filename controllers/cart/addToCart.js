import { cartModel } from '../../models/cart.js'

// Controller for adding product to cart
export const addToCart = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id

		// Gets the product ID, quantity and variant from the request body
		const productID = req.body.item
		const quantity = req.body.quantity
		const variant = req.body.variant || 'Default'

		// Finds a cart that corresponds to the userID
		const cart = await cartModel.findOne({ user: userID })

		// If there is no cart like that, create a new cart
		if (!cart) {
			// Creates a new cart using the cartModel
			const newCart = new cartModel({
				user: userID,
				products: [
					{
						item: productID,
						quantity,
						variant,
					},
				],
			})

			// Saves the new cart
			await newCart.save()

			// Upon success, send a success response
			return res.status(200).json({
				success: true,
				message: 'Product added to cart successfully',
				cart: newCart,
			})
		}

		// If the product already exists in the cart, send an error response
		const productExists = cart.products.findIndex(
			(product) => product.item == productID && product.variant === variant
		)

		if (productExists !== -1) {
			return res.status(400).json({
				success: false,
				message: 'Product already exists in cart',
			})
		}

		// Pushes new products to the cart if there was already a cart to the user
		const newCart = await cartModel.findByIdAndUpdate(
			cart._id,
			{
				$push: {
					products: {
						item: productID,
						quantity,
						variant,
					},
				},
			},
			{ new: true, fields: { products: 1 } }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product added to cart successfully',
			cart: newCart,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Get wish list failed',
		})
	}
}
