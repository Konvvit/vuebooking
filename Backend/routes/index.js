import express from 'express'
import loginRoute from './login.js' // Ensure the correct path and include .js extension
import bookingsRoute from './bookings.js'
import servicesRoute from './services.js'


const router = express.Router()

router.use('/login', loginRoute) // Make sure login route is included
router.use('/bookings', bookingsRoute)
router.use('/services', servicesRoute)

export default router
