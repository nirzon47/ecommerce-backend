import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	expiry: {
		type: Date,
		required: true,
	},
})

export const tokenModel = model('tokens', tokenSchema)
