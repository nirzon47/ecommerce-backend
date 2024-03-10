import { Router } from 'express'
import productsController from '../controllers/products.js'
import upload from '../middlewares/productsMulterConfig.js'

const router = Router()

router.post('/', upload.single('productImage'), productsController.addProduct)

export default router
