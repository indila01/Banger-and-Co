import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'

// @desc    Create new booking
// @route   Post /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { vehicleDetails, driverDetails, paymentMethod, totalPrice, tax } =
    req.body

  if (!vehicleDetails) {
    res.status(400)
    throw new Error('No vehicle selected')
    return
  } else {
    const booking = new Booking({
      user: req.user._id,
      vehicle: vehicleDetails._id,
      driverDetails,
      paymentMethod,
      totalPrice,
      tax,
    })
    const createdBooking = await booking.save()
    res.status(201).json(createdBooking)
  }
})

// @desc    get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingbyId = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('vehicle')

  if (booking) {
    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

export { createBooking, getBookingbyId }
