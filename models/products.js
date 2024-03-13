import mongoose, { Schema, model } from 'mongoose'

const ratingSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	comment: {
		type: String,
		required: true,
	},
})

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
	ratings: [ratingSchema],
})

const ProductsModel = model('products', productsSchema)

export default ProductsModel
