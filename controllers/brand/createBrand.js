import { brandModel } from '../../models/brand.js'

// Controller for creating a brand
export const createBrand = async (req, res) => {
	try {
		// Gets the name from the request body
		const { name } = req.body

		// If the name is not provided, send an error response
		if (!name) {
			throw new Error('Name is required')
		}

		// Creates a new brand in database
		const brand = await brandModel.create({ name })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Brand created successfully',
			brand,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Create brand failed',
		})
	}
}
