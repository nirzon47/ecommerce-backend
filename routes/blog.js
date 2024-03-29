import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import blogController from '../controllers/blog.js'

const router = Router()

// Add Blog
router.post('/', tokenVerification(['admin']), blogController.addBlog)

// Edit Blog
router.patch('/:bID', tokenVerification(['admin']), blogController.editBlog)

// Get Blogs
router.get('/', blogController.getBlogs)

// Delete Blog
router.delete('/:bID', tokenVerification(['admin']), blogController.deleteBlog)

export default router
