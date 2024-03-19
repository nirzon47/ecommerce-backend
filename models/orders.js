import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
	products: [
		{
			item: { type: Schema.Types.ObjectId, ref: 'products' },
			quantity: { type: Number, required: true },
			variant: { type: String, required: true, default: 'Default' },
		},
	],
})

const orderHistorySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	orders: [
		{
			cart: cartSchema,
			total: {
				type: Number,
				required: true,
			},
			date: {
				type: String,
				required: true,
			},
			deliveryDate: {
				type: String,
				required: true,
			},
			coupon: {
				type: String,
				default: null,
			},
			orderStatus: {
				type: String,
				required: true,
			},
			paymentMode: {
				type: String,
				required: true,
			},
			transactionID: {
				type: String,
				default: null,
			},
		},
	],
})

const orderHistoryModel = model('orderHistory', orderHistorySchema)

export default orderHistoryModel
