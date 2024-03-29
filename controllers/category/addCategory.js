import { categoryModel } from '../../models/category.js'

// Controller for adding category
export const addCategory = async (req, res) => {
	try {
		// Gets the category from the request body
		const { category } = req.body

		// If the category is not provided, send an error response
		if (!category) {
			throw new Error('Category is required')
		}

		// Finds all the categories in the database
		const categoryArray = await categoryModel.findOne({})

		// If the category is not found, create a new category in the database
		if (!categoryArray) {
			const newCategory = await categoryModel.create({
				categories: [category],
			})

			// Upon success, send a success response
			return res.status(200).json({
				success: true,
				message: 'Category added successfully',
				category: newCategory,
			})
		}

		// If the category already exists, send an error response
		const categoryExists = categoryArray.categories.find((c) => {
			const lowerC = c.toLowerCase().split(' ').join('')
			const lowerCategory = category.toLowerCase().split(' ').join('')

			return lowerC === lowerCategory
		})
		if (categoryExists) {
			throw new Error('Category already exists')
		}

		// Updates the category in the database
		const updatedCategory = await categoryModel.findOneAndUpdate(
			{},
			{ $push: { categories: category } },
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Category added successfully',
			category: updatedCategory,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Add category failed',
		})
	}
}
