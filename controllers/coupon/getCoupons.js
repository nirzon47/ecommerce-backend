import { couponModel } from '../../models/coupon.js'

// Controller for getting all the coupons
export const getCoupons = async (req, res) => {
	try {
		// Gets all the coupons from the database
		const coupons = await couponModel.find()

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			coupons,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Get coupons failed',
		})
	}
}
