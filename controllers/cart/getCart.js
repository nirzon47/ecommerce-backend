import { cartModel } from '../../models/cart.js'

export const getCart = async (req, res) => {
	try {
		const userID = req.user._id

		const cart = await cartModel.findOne({ user: userID }).populate([
			{
				path: 'products.item',
				select: 'name price imagePath description',
			},
			{ path: 'user', select: 'firstName lastName' },
		])
		console.log(cart)
		if (!cart) {
			return res.status(200).json({
				success: false,
				message: 'Cart is empty',
			})
		}

		const total = cart.products.reduce(
			(sum, item) => sum + item.quantity * item.item.price,
			0
		)

		res.status(200).json({
			success: true,
			message: 'Cart fetched successfully',
			cart,
			total,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Cart fetch failed',
		})
	}
}
