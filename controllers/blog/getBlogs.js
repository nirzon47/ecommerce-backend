import { blogModel } from '../../models/blog.js'

export const getBlogs = async (req, res) => {
	try {
		// Gets all the blogs from the database
		const blogs = await blogModel.find()

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			blogs,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: error.message || 'Get blogs failed',
		})
	}
}
