import express from 'express'
import getAllServices from '../controllers/servicesController.js' // Correct import for a default export

const router = express.Router()

router.get('/', getAllServices) // Use the imported function directly

export default router
