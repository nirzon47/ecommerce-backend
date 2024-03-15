import { ProductsModel } from '../../models/products.js'

// Controller for adding product
export const addProduct = async (req, res) => {
	try {
		// Adds the form data and file path to the product object
		const product = { ...req.body, imagePath: req.file.path }

		// Creates a new product model and saves it to the database
		const newProduct = new ProductsModel(product)
		await newProduct.save()

		// Upon success, send a success response
		res.status(200).json({
			success: true,
			message: 'Product created successfully',
			product: newProduct,
		})
	} catch (error) {
		// Upon failure, send an error response
		res.status(500).json({
			success: false,
			message: 'Product creation failed',
			error,
		})
	}
}
