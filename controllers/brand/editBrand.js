import { brandModel } from '../../models/brand.js'

// Controller for editing a brand
export const editBrand = async (req, res) => {
	try {
		// Gets the brand ID from the dynamic route
		const bID = req.params.bID
		// Gets the name from the request body
		const { name } = req.body

		// Queries the database for the brand with the given ID and updates it
		const brand = await brandModel.findByIdAndUpdate(
			bID,
			{
				name,
			},
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Edit brand successfully',
			brand,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Edit coupon failed',
		})
	}
}
