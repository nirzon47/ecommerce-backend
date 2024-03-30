import { Schema, model } from 'mongoose'

const couponSchema = new Schema({
	code: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	expiry: {
		type: Date,
		required: true,
	},
	limit: {
		type: Number,
		default: 0,
	},
})

export const couponModel = model('coupons', couponSchema)
