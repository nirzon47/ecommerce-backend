import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = file.fieldname + '-' + uuidv4()
		cb(null, uniqueSuffix + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

export default upload
