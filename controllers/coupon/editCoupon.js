import dayjs from 'dayjs'
import { couponModel } from '../../models/coupon.js'

// Controller for editing a coupon
export const editCoupon = async (req, res) => {
	try {
		// Gets the coupon ID from the request params
		const cID = req.params.cID

		// Gets the coupon code, discount, expiry, and limit from the request body
		let { code, discount, expiry, limit } = req.body

		// Queries the database for the coupon with the given ID
		const coupon = await couponModel.findById(cID)

		// If the coupon is not found, send an error response
		if (!coupon) {
			throw new Error('Coupon not found')
		}

		// If the coupon code, discount, expiry, and limit are not provided, get the coupon code,
		// discount, expiry, and limit from the database
		if (!code) {
			code = coupon.code
		}
		if (!discount) {
			discount = coupon.discount
		}
		// If the expiry is not provided, add the expiry from the database
		if (!expiry) {
			expiry = dayjs().add(coupon.expiry, 'days')
		} else {
			expiry = dayjs().add(expiry, 'days')
		}
		if (!limit) {
			limit = coupon.limit
		}

		// Updates the coupon in the database
		const updatedCoupon = await couponModel.findByIdAndUpdate(
			cID,
			{
				code,
				discount,
				expiry,
				limit,
			},
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Coupon updated successfully',
			coupon: updatedCoupon,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Edit coupon failed',
		})
	}
}
