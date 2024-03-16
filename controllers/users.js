import { registration } from './users/registration.js'
import { login } from './users/login.js'
import { logout } from './users/logout.js'
import { addToWishList } from './users/addToWishList.js'

const usersController = {
	registration,
	login,
	logout,
	addToWishList,
}

export default usersController
