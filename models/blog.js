import { Schema, model } from 'mongoose'

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export const blogModel = model('blogs', blogSchema)
