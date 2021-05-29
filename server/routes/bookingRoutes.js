import express from 'express'
const router = express.Router()
import { createBooking } from '../controllers/bookingController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createBooking)

export default router
