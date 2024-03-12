import mongoose, { Schema, model } from 'mongoose'

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
	likes: {
		type: [mongoose.Types.ObjectId],
		default: [],
		ref: 'users',
	},
	dislikes: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
		ref: 'users',
	},
})

const ProductsModel = model('products', productsSchema)

export default ProductsModel
