import express from 'express'
const router = express.Router()
import {
  createBooking,
  getBookingbyId,
  updateBookingToPaid,
} from '../controllers/bookingController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createBooking)
router.route('/:id').get(protect, getBookingbyId)
router.route('/:id/pay').put(protect, updateBookingToPaid)

export default router
