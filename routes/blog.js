import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import blogController from '../controllers/blog.js'

const router = Router()

// Add Blog
router.post('/', tokenVerification(['admin']), blogController.addBlog)

export default router
