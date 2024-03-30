import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.GMAIL,
				pass: process.env.GMAIL_PASSWORD,
			},
		})

		await transporter.sendMail({
			from: `A Great Ecommerce Website <${process.env.GMAIL}>`,
			to: email,
			subject: subject,
			text: text,
			html: text,
		})
	} catch (error) {
		console.log(error)
	}
}
