import { cartModel } from '../../models/cart.js'
import { userModel } from '../../models/users.js'
import dayjs from 'dayjs'
import orderHistoryModel from '../../models/orders.js'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'

dotenv.config()

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Controller for placing an order
export const checkoutCart = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id
		const paymentMode = req.body.paymentMode

		// Checks if the user has an address
		const user = await userModel.findById(userID, { address: 1 })

		// If the user has no address, send an error response
		if ('{}' === JSON.stringify(user.address)) {
			throw new Error('No address')
		}

		// Gets the cart of the user and populates the item and user fields
		const cart = await cartModel.findOne({ user: userID }).populate({
			path: 'products.item',
			select: 'name price',
		})

		// If the cart is empty, send an error response
		if (cart.products.length === 0) {
			throw new Error('Cart is empty')
		}

		// Calculates the total price of the cart
		const total = cart.products.reduce(
			(sum, cartItem) => sum + cartItem.quantity * cartItem.item.price,
			0
		)

		// Generates a random delivery date
		const randomNumber = Math.floor(Math.random() * 7)
		const deliveryDate = dayjs().add(randomNumber, 'days').valueOf()

		const options = {
			amount: total * 100,
			currency: 'INR',
			receipt: uuid(),
			payment_capture: 1,
		}

		let RPOrder
		if (paymentMode === 'online') {
			try {
				RPOrder = await razorpay.orders.create(options)
			} catch (error) {
				throw new Error(error)
			}
		}

		// Creates the order
		const order = {
			cart,
			total,
			date: Date.now(),
			deliveryDate: deliveryDate,
			coupon: req.body.coupon || null,
			orderStatus: 'Placed',
			paymentMode: paymentMode,
			paymentStatus: paymentMode === 'cod' ? 'Paid' : 'Pending',
			RPOrder: paymentMode === 'cod' ? null : RPOrder,
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
		// await cartModel.findByIdAndDelete(cart._id)

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
