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

// @desc    update booking to paid
// @route   PUT /api/bookings/:id/pay
// @access  Private
const updateBookingToPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isPaid = true
    booking.paidAt = Date.now()
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    update booking to paid
// @route   PUT /api/bookings/:id/verified
// @access  Private,admin
const updateBookingToVerified = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isVerified = true
    booking.verifiedAt = Date.now()

    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    get logged in user bookings
// @route   GET /api/bookings/:id/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    'vehicle'
  )
  res.json(bookings)
})

// @desc    Get all  bookings
// @route   GET /api/bookings
// @access  Private,admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('vehicle')
    .populate('user', 'id firstName lastName')
  res.json(bookings)
})

export {
  createBooking,
  getBookingbyId,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
  updateBookingToVerified,
}
