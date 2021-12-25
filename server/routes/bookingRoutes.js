import express from 'express'
const router = express.Router()
import {
  createBooking,
  getBookingbyId,
  getBookings,
  getMyBookings,
  updateBookingToPaid,
  updateBookingToVerified,
} from '../controllers/bookingController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createBooking).get(protect, admin, getBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/:id').get(protect, getBookingbyId)
router.route('/:id/pay').put(protect, updateBookingToPaid)
router.route('/:id/verify').put(protect, admin, updateBookingToVerified)

export default router
