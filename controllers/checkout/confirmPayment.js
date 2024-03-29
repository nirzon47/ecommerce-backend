import orderHistoryModel from '../../models/orders.js'

// Controller for confirming payment
export const confirmPayment = async (req, res) => {
	try {
		// Gets the order ID from the request body
		const orderID = req.body.orderID

		// Finds the appropriate order and updates its payment status
		const updatedOrder = await orderHistoryModel.findOneAndUpdate(
			{ 'orders.cart._id': orderID },
			{ $set: { 'orders.$.paymentStatus': 'Paid' } }
		)

		// Upon success, send a success response
		res.json({
			success: true,
			message: 'Payment successful',
			order: updatedOrder,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Payment failed',
		})
	}
}
