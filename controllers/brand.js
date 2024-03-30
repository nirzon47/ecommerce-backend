import { createBrand } from './brand/createBrand.js'
import { editBrand } from './brand/editBrand.js'
import { deleteBrand } from './brand/deleteBrand.js'
import { getBrands } from './brand/getBrands.js'

const brandController = { createBrand, editBrand, deleteBrand, getBrands }

export default brandController
