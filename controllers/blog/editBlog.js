import { blogModel } from '../../models/blog.js'

// Controller for editing blog
export const editBlog = async (req, res) => {
	try {
		// Gets the blog ID from the dynamic route
		const bID = req.params.bID

		// Gets the title and content from the request body
		let { title, content } = req.body

		// Queries the blog from the database
		const blog = await blogModel.findById(bID)

		// If the blog is not found, send an error response
		if (!blog) {
			throw new Error('Blog not found')
		}

		// If the title is not modified, use the title from the database
		if (!title) {
			title = blog.title
		}

		// If the content is not modified, use the content from the database
		if (!content) {
			content = blog.content
		}

		// Updates the blog in the database
		const newBlog = await blogModel.findByIdAndUpdate(
			bID,
			{ title, content },
			{ new: true }
		)

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Blog edited successfully',
			blog: newBlog,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Edit blog failed',
		})
	}
}
