import mongoose, { Schema } from 'mongoose'
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
})

// Middleware that hashes the password before saving
userSchema.pre('save', function () {
	const saltRounds = bcrypt.genSaltSync(10) // 10 salt rounds for hashing
	const hash = bcrypt.hashSync(this.password, saltRounds) // Hash the password

	this.password = hash // Replace the password with the hash
})

// Export user model
export const userModel = mongoose.model('users', userSchema)
