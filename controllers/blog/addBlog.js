import { blogModel } from '../../models/blog.js'

// Controller for adding blog
export const addBlog = async (req, res) => {
	try {
		// Gets the title and content from the request body
		const { title, content } = req.body

		// If the title and content are not provided, send an error response
		if (!title || !content) {
			throw new Error('Title and content are required')
		}

		// Creates a new blog in database
		const blog = await blogModel.create({ title, content })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Blog added successfully',
			blog,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Add blog failed',
		})
	}
}
