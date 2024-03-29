import { blogModel } from '../../models/blog.js'

export const addBlog = async (req, res) => {
	try {
		const { title, content } = req.body

		if (!title || !content) {
			throw new Error('Title and content are required')
		}

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
