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

export { createBooking }
