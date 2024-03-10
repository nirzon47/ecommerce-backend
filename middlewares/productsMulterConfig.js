import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
	// Specifies the destination of the uploaded file in the server
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},

	// Specifies the file name of the uploaded file in the server
	filename: function (req, file, cb) {
		const uniqueSuffix = file.fieldname + '-' + uuidv4()
		cb(null, uniqueSuffix + path.extname(file.originalname))
	},
})

// Makes the upload config for multer
const upload = multer({ storage: storage })

export default upload
