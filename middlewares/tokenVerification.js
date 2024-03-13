import { userModel } from '../models/users.js'
import jwt from 'jsonwebtoken'

const tokenVerification = (role) => async (req, res, next) => {
	try {
		// Token from header comes in the format of 'Bearer <token>'
		const tokenFromHeader = req.headers.token.split(' ')[1]
		// Decodes the token
		const token = jwt.decode(tokenFromHeader)
		// Verifies the token
		const isVerified = jwt.verify(tokenFromHeader, process.env.JWT_SECRET)
		// Checks if the user is authorized
		const isAuthorized = role.includes(token.role)

		// Checks if the token is valid from database level
		const user = await userModel.findById(token._id)
		const checkFromDB = user.tokens.includes(tokenFromHeader)

		// If the token is invalid, send an error response
		if (!token || !isVerified || !isAuthorized || !checkFromDB) {
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
