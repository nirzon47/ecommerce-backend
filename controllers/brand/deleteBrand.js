import { brandModel } from '../../models/brand.js'

// Controller for editing a brand
export const deleteBrand = async (req, res) => {
	try {
		// Gets the brand ID from the dynamic route
		const bID = req.params.bID

		// Queries the database for the brand with the given ID and updates it
		const brand = await brandModel.findByIdAndDelete(bID, { new: true })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Delete brand successfully',
			brand,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Delete coupon failed',
		})
	}
}
