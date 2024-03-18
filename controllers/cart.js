import { addToCart } from './cart/addToCart.js'
import { removeFromCart } from './cart/removeFromCart.js'
import { changeQuantity } from './cart/changeQuantity.js'

const cartController = { addToCart, removeFromCart, changeQuantity }

export default cartController
