import { cartModel } from '../models/cart.js'
import dayjs from 'dayjs'

export const checkout = async (req, res) => {
	try {
		const userID = req.user._id

		const cart = await cartModel.findOne({ user: userID }).populate([
			{
				path: 'products.item',
				select: 'name price imagePath description',
			},
			{ path: 'user', select: 'firstName lastName address' },
		])

		const total = cart.products.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		)

		const randomNumber = Math.floor(Math.random() * 7)
		const deliveryDate = dayjs().add(randomNumber, 'days')

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
