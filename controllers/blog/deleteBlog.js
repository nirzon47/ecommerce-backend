import { blogModel } from '../../models/blog.js'

export const deleteBlog = async (req, res) => {
	try {
		// Gets the blog ID from the dynamic route
		const bID = req.params.bID

		// Queries the blog from the database
		const blog = await blogModel.findById(bID)

		// If the blog is not found, send an error response
		if (!blog) {
			throw new Error('Blog not found')
		}

		// Deletes the blog from the database
		const deletedBlog = await blogModel.findByIdAndDelete(bID, { new: true })

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Blog deleted successfully',
			blog: deletedBlog,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Delete blog failed',
		})
	}
}
