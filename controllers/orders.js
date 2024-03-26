import orderHistoryModel from '../models/orders.js'

// Get Orders
export const getOrders = async (req, res) => {
	try {
		// Gets the user ID from the middleware
		const userID = req.user._id

		// Gets the order history of the user and populates the item and user fields
		const orders = await orderHistoryModel
			.findOne({ user: userID })
			.populate([
				{
					path: 'user',
					select: 'firstName lastName email address',
				},
				{
					path: 'orders.cart.products.item',
					select: 'name price imagePath description',
				},
			])

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Orders fetched successfully',
			data: orders,
		})
	} catch (err) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: err.message || 'Orders fetch failed',
		})
	}
}
