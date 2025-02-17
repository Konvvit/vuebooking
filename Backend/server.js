import express from 'express'
import path from 'path'
import cors from 'cors'
import verifyToken from './middlewares/authmiddleware.js'
import { db, PORT } from './config/db.js'
import routes from './routes/index.js' // Add .js extensions for ES modules

const app = express()

// Middleware
app.use(express.json()) // To parse JSON request bodies
app.use(cors()) // To handle CORS issues

// Routes
app.use('/api', routes) // Include all routes from routes/index.js

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is running')
})

// Protected Route Example (Booking)
app.use('/api/bookings', verifyToken) // Protect this route with JWT middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
