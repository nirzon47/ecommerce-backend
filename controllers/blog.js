import { addBlog } from './blog/addBlog.js'
import { editBlog } from './blog/editBlog.js'
import { getBlogs } from './blog/getBlogs.js'
import { deleteBlog } from './blog/deleteBlog.js'

const blogController = {
	addBlog,
	editBlog,
	getBlogs,
	deleteBlog,
}

export default blogController
