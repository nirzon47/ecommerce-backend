import { brandModel } from '../../models/brand.js'

// Controller to get all brands
export const getBrands = async (req, res) => {
	try {
		// Gets all the brands from the database
		const brands = await brandModel.find()

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			brands,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Get brands failed',
		})
	}
}
