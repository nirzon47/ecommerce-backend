import { registration } from './users/registration.js'
import { login } from './users/login.js'
import { logout } from './users/logout.js'
import { addToWishList } from './users/addToWishList.js'
import { removeFromWishlist } from './users/removeFromWishlist.js'
import { getWishlist } from './users/getWishlist.js'
import { addAddress } from './users/addAddress.js'
import { editAddress } from './users/editAddress.js'
import { getAddress } from './users/getAddress.js'

const usersController = {
	registration,
	login,
	logout,
	addToWishList,
	removeFromWishlist,
	getWishlist,
	addAddress,
	editAddress,
	getAddress,
}

export default usersController
