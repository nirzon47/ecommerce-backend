import { categoryModel } from '../../models/category.js'

// Controller for editing category
export const editCategory = async (req, res) => {
	try {
		// Gets the old and updated category name from the request body
		const { old, updated } = req.body

		// Queries the category from the database
		const categories = await categoryModel.findOne({})

		// Finds the index of the category in the array that matches the old name
		const index = categories.categories.findIndex((c) => {
			const lowerC = c.toLowerCase().split(' ').join('')
			const lowerCategory = old.toLowerCase().split(' ').join('')

			return lowerC === lowerCategory
		})

		// If the category is not found, send an error response
		if (index === -1) {
			throw new Error('Category not found')
		}

		// Updates the category in the array that matches the old name
		categories.categories.splice(index, 1)
		// Adds the updated category to the array
		categories.categories.push(updated)

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
			message: error.message || 'Edit category failed',
		})
	}
}
