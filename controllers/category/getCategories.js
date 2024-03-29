import { categoryModel } from '../../models/category.js'

// Controller for getting categories
export const getCategories = async (req, res) => {
	try {
		// Queries the category from the database
		const categories = await categoryModel.findOne({})

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Categories retrieved successfully',
			categories: categories.categories,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Get categories failed',
		})
	}
}
