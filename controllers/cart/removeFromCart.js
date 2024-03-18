import { cartModel } from '../../models/cart.js'

// Controller for removing product from cart
export const removeFromCart = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id

		// Gets the product ID and variant from the request body
		const productID = req.body.item
		const variant = req.body.variant || 'Default'

		// Gets the cart of the user
		const cart = await cartModel.findOne({ user: userID })

		// If the cart is not found, send an error response
		if (!cart) {
			throw new Error('Cart not found')
		}

		// Checks if the product exists in the cart
		const productExists = cart.products.findIndex(
			(item) => item.item == productID && item.variant === variant
		)

		// If the product does not exist in the cart, send an error response
		if (productExists === -1) {
			throw new Error('Product not found in cart')
		}

		// Removes the product from the cart
		const updatedCart = await cartModel.findByIdAndUpdate(
			cart._id,
			{ $pull: { products: { item: productID, variant } } },
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product removed from cart successfully',
			cart: updatedCart,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(400).json({
			success: false,
			message: err.message,
		})
	}
}
