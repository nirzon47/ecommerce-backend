import { cartModel } from '../models/cart.js'
import dayjs from 'dayjs'
import orderHistoryModel from '../models/orders.js'

// Controller for placing an order
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
			cart,
			total,
			date: dayjs().format('DD-MM-YYYY HH:mm:ss'),
			deliveryDate: deliveryDate.format('DD-MM-YYYY HH:mm:ss'),
			coupon: req.body.coupon || null,
			orderStatus: 'Placed',
			paymentMode: req.body.paymentMode || 'COD',
			transactionID: null,
		}

		// Gets the order history collection that matches the userID
		const orderHistoryObject = await orderHistoryModel.findOne({
			user: userID,
		})

		// If there is no order history, create a new one
		if (!orderHistoryObject) {
			const orderHistory = new orderHistoryModel({
				user: userID,
				orders: [order],
			})
			await orderHistory.save()
		} else {
			// If there is an order history, push the new order
			await orderHistoryModel.findOneAndUpdate(
				{ user: userID },
				{ $push: { orders: order } }
			)
		}

		// Deletes the cart
		await cartModel.findByIdAndDelete(cart._id)

		// TODO: Process cart depending on the payment && email (optional)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Checkout successful and cart deleted',
			order: order,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Checkout failed',
		})
	}
}
