import { Router } from 'express'
import brandController from '../controllers/brand.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const router = Router()

// Add Brand
router.post('/', tokenVerification(['admin']), brandController.createBrand)

export default router
