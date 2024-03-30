import { couponModel } from '../../models/coupon.js'
import dayjs from 'dayjs'

// Controller for creating a coupon
export const createCoupon = async (req, res) => {
	try {
		// Gets the coupon code, discount, expiry, and limit from the request body
		const { code, discount, expiry, limit } = req.body

		// If the coupon code, discount, expiry, and limit are not provided, send an error response
		if (!code || !discount || !expiry || !limit) {
			throw new Error(
				'Coupon code, discount, expiry, and limit are required'
			)
		}

		// Creates a new coupon in database
		const coupon = await couponModel.create({
			code,
			discount,
			// Gets the current date and adds expiry days to it
			expiry: dayjs().add(expiry, 'days'),
			limit,
		})

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Coupon created successfully',
			coupon,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Create coupon failed',
		})
	}
}
