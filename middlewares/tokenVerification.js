import { userModel } from '../models/users.js'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const tokenVerification = (role) => async (req, res, next) => {
	try {
		// Token from header comes in the format of 'Bearer <token>'
		const tokenFromHeader = req.headers.Authorization.split(' ')[1]
		// Decodes the token
		const token = jwt.decode(tokenFromHeader)

		// Checks if the user is authorized
		const isAuthorized = role.includes(token.role)

		// Checks if the token is valid from database level
		let user = await userModel.findById(token._id)

		// Makes a new array of tokens that only has valid tokens
		const refreshedTokens = []
		// Checks if the token is valid from token level
		for (const tkn of user.tokens) {
			if (
				jwt.verify(tkn, process.env.JWT_SECRET, (err, decoded) => {
					if (err) {
						return false
					}

					return true
				})
			) {
				refreshedTokens.push(tkn)
			} else {
				console.log('count')
			}
		}

		// Updates the tokens in the database to remove expired tokens
		user = await userModel.findByIdAndUpdate(
			user._id,
			{ $set: { tokens: refreshedTokens } },
			{ new: true }
		)

		const isVerified = user.tokens.includes(tokenFromHeader)

		// If the token is invalid, send an error response
		if (!token || !isAuthorized || !isVerified) {
			throw new Error('Forbidden')
		}

		req.user = user
		// If the token is valid, continues to the next middleware
		next()
	} catch (err) {
		return res.status(403).json({
			success: false,
			message: err.message || 'Forbidden',
		})
	}
}

export default tokenVerification
