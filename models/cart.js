import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	products: [
		{
			item: { type: Schema.Types.ObjectId, ref: 'products' },
			quantity: { type: Number, required: true },
			variant: { type: String, required: true, default: 'Default' },
		},
	],
})

export const cartModel = model('cart', cartSchema)
