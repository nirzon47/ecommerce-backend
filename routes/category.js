import { Router } from 'express'
import tokenVerification from '../middlewares/tokenVerification.js'
import categoryController from '../controllers/category.js'

const router = Router()

// Add Category
router.post('/', tokenVerification(['admin']), categoryController.addCategory)

// Edit Category
router.patch('/', tokenVerification(['admin']), categoryController.editCategory)

// Get Categories
router.get('/', categoryController.getCategories)

// Delete Category
router.delete(
	'/',
	tokenVerification(['admin']),
	categoryController.deleteCategory
)

export default router
