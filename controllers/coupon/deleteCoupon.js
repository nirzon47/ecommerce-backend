import { couponModel } from '../../models/coupon.js'

// Controller to delete a coupon
export const deleteCoupon = async (req, res) => {
	try {
		// Gets the coupon ID from the request params
		const cID = req.params.cID

		// Finds and deletes the coupon with the given ID
		const coupon = await couponModel.findByIdAndDelete(cID, { new: true })

		// Upon success, send a success response
		res.json({
			success: true,
			message: 'Coupon deleted successfully',
			coupon,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Delete coupon failed',
		})
	}
}
