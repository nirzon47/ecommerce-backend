import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
	categories: {
		type: Array,
		default: [],
	},
})

export const categoryModel = model('category', categorySchema)
