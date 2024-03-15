import { addProduct } from './products/addProduct.js'
import { likeDislikeProduct } from './products/likeDislikeProduct.js'
import { getProduct } from './products/getProduct.js'
import { addRating } from './products/addRating.js'
import { editRating } from './products/editRating.js'
import { deleteRating } from './products/deleteRating.js'
import { getRatings } from './products/getRatings.js'

const productsController = {
	addProduct,
	likeDislikeProduct,
	getProduct,
	addRating,
	editRating,
	deleteRating,
	getRatings,
}

export default productsController
