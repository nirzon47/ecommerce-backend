import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

// User schema
const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	tokens: {
		type: Array,
		default: [],
	},
	wishlist: {
		type: [Schema.Types.ObjectId],
		default: [],
		ref: 'products',
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zip: {
			type: Number,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		default: {
			type: Boolean,
			default: false,
		},
	},
})

// Middleware that hashes the password before saving
userSchema.pre('save', function () {
	const saltRounds = bcrypt.genSaltSync(10) // 10 salt rounds for hashing
	const hash = bcrypt.hashSync(this.password, saltRounds) // Hash the password

	this.password = hash // Replace the password with the hash
})

// Middleware that checks if the password is correct
userSchema.methods.isValidPassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

// Export user model
export const userModel = model('users', userSchema)
