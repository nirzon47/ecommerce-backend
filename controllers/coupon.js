import { createCoupon } from './coupon/createCoupon.js'
import { editCoupon } from './coupon/editCoupon.js'
import { getCoupons } from './coupon/getCoupons.js'
import { deleteCoupon } from './coupon/deleteCoupon.js'

const couponController = {
	createCoupon,
	editCoupon,
	getCoupons,
	deleteCoupon,
}

export default couponController
