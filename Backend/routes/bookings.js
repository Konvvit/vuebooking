import express from 'express'
import BookingController from '../controllers/bookingController.js'
import verifyToken from '../middlewares/authmiddleware.js' // JWT middleware

const router = express.Router()

// Create a booking (no authentication needed)
router.post('/', BookingController.createBooking)

// GET route to fetch all bookings, only for authenticated users
router.get('/', verifyToken, BookingController.getAllBookings)

export default router
