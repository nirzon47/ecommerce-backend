import { cartModel } from '../models/cart.js'
import dayjs from 'dayjs'

export const checkout = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id

		// Gets the cart of the user and populates the item and user fields
		const cart = await cartModel.findOne({ user: userID }).populate({
			path: 'products.item',
			select: 'name price',
		})

		// Calculates the total price of the cart
		const total = cart.products.reduce(
			(sum, cartItem) => sum + cartItem.quantity * cartItem.item.price,
			0
		)

		// Generates a random delivery date
		const randomNumber = Math.floor(Math.random() * 7)
		const deliveryDate = dayjs().add(randomNumber, 'days')

		// Creates the order
		const order = {
			user: userID,
			cart,
			total,
			date: dayjs(),
			deliveryDate,
			coupon: req.body.coupon || null,
			orderStatus: 'Placed',
			paymentMode: req.body.paymentMode || 'COD',
			transactionID: null,
		}
		res.send(order)
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Checkout failed',
		})
	}
}
