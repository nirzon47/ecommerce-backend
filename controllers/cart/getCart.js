import { cartModel } from '../../models/cart.js'

export const getCart = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id
		const coupon = req.body.coupon

		// Gets the cart of the user and populates the item and user fields
		const cart = await cartModel.findOne({ user: userID }).populate([
			{
				path: 'products.item',
				select: 'name price imagePath description',
			},
			{ path: 'user', select: 'firstName lastName' },
		])

		// If the cart is empty, send a response with an empty cart
		if (!cart) {
			return res.status(200).json({
				success: false,
				message: 'Cart is empty',
			})
		}

		// Calculates the total price of the cart
		let total = cart.products.reduce(
			(sum, item) => sum + item.quantity * item.item.price,
			0
		)

		// If a coupon is provided, calculate the discount
		if (coupon) {
			// Gets the coupon from the database
			const couponData = await couponModel
				.findOne({ code: coupon })
				.populate({
					path: 'coupons',
				})

			const discount = couponData.discount
			const discountAmount = (total * discount) / 100

			total = total - Math.min(discountAmount, couponData.limit)
		}

		// Send a response with the cart and total
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
