import { Schema, model } from 'mongoose'

const brandSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

export const brandModel = model('brands', brandSchema)
