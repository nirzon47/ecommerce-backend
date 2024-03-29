import { categoryModel } from '../../models/category.js'

// Controller for deleting category
export const deleteCategory = async (req, res) => {
	try {
		// Gets the category from the request body
		const { category } = req.body

		// Queries the category from the database
		const categories = await categoryModel.findOne({})

		// Finds the index of the category in the array that matches the old name
		const index = categories.categories.findIndex((c) => {
			const lowerC = c.toLowerCase().split(' ').join('')
			const lowerCategory = category.toLowerCase().split(' ').join('')

			return lowerC === lowerCategory
		})

		// If the category is not found, send an error response
		if (index === -1) {
			throw new Error('Category not found')
		}

		// Removes the category from the array
		categories.categories.splice(index, 1)

		// Replaces the category array in the database
		const updatedCategory = await categoryModel.findByIdAndUpdate(
			categories._id,
			{
				$set: {
					categories: categories.categories,
				},
			},
			{
				new: true,
			}
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Category edited successfully',
			category: updatedCategory.categories,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Delete category failed',
		})
	}
}
