import { addToCart } from './cart/addToCart.js'
import { removeFromCart } from './cart/removeFromCart.js'
import { changeQuantity } from './cart/changeQuantity.js'
import { getCart } from './cart/getCart.js'

const cartController = { addToCart, removeFromCart, changeQuantity, getCart }

export default cartController
