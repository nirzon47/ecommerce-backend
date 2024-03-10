import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	imagePath: {
		type: String,
		default: null,
	},
	stock: {
		type: Number,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
})

const ProductsModel = model('products', productsSchema)

export default ProductsModel
