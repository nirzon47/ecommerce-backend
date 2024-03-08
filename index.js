import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'

const PORT = process.env.PORT || 5000

// Environment variables
dotenv.config()

// MongoDB
mongoose
	.connect(process.env.MONGO_URI, { dbName: 'ecommerce' })
	.then(() => {
		console.log('MongoDB connected')
	})
	.catch((err) => {
		console.log(err)
	})

const app = express()

// Middlewares
app.use(cors()) // Cross-Origin Resource Sharing
app.use(express.json())
app.use(morgan(':method | Endpoint - :url | :date[web] | :response-time ms')) // Logging

// Routes
app.use('/api/v1/users', userRoutes)

// Express server starting
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
