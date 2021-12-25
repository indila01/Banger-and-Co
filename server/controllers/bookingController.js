import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import Vehicle from '../models/vehicleModel.js'
import axios from 'axios'

// @desc    Create new booking
// @route   Post /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const {
    vehicleDetails,
    driverDetails,
    paymentMethod,
    totalPrice,
    tax,
    startDate,
    endDate,
    numberOfDays,
    equipments,
  } = req.body

  //verify license
  const user = await User.findById(req.user._id)

  //dmv
  const { data: licenseNumbers } = await axios.get(
    'https://bangerexternalapi.azurewebsites.net/api/dmv'
  )

  const checkLicenseNumber = (obj) =>
    obj.licensenumber === driverDetails.driverLicenseNumber

  if (licenseNumbers.some(checkLicenseNumber)) {
    const emailBody = ` <p>User tried to rent a vehicle with an expired or stolen license</p>
    <ul>
    <li>Driver Name: ${driverDetails.driverFirstName} ${driverDetails.driverLastName}</li>
    <li>Driver NIC: ${driverDetails.driverNIC} </li>
    <li>Driver License: ${driverDetails.driverLicenseNumber}</li>
 <hr>
 <p> ${user.documents[0]}</p>
 <p> ${user.documents[1]}</p>
    </ul>
    `

    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    })
    transporter.sendMail({
      from: 'Banger and Co<bangerandco4@gmail.com>',
      to: 'indiladineth@yahoo.com',
      subject: `Expired or stolen license number`,
      html: emailBody,
    })

    res.status(400)
    throw new Error(
      'Your license number is expired or stolen. Please contact DMV'
    )
  }

  //insurers
  const { data: NIC } = await axios.get(
    'https://bangerexternalapi.azurewebsites.net/api/insurance'
  )
  const checkNIC = (obj) => obj.NIC === driverDetails.driverNIC

  if (NIC.some(checkNIC)) {
    res.status(400)
    throw new Error(
      'Your made fraudulent claims for car accidents. You cannon book vehicles'
    )
  }

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
      startDate,
      endDate,
      numberOfDays,
      equipments,
    })

    const createdBooking = await booking.save()
    res.status(201).json(createdBooking)

    const user = await User.findById(req.user._id)
    const vehicle = await Vehicle.findById(vehicleDetails._id)

    const emailBody = `<h1>Booking Confirmation Completed</h1>
    <h3>${vehicle.name}</h3>
    <h6>${vehicle.licensePlateNumber}</h6>
    <ul>
    <li>Driver Name: ${createdBooking.driverDetails.driverFirstName} ${createdBooking.driverDetails.driverLastName}</li>
    <li>Driver NIC: ${createdBooking.driverDetails.driverNIC} </li>
    <li>Driver License: ${createdBooking.driverDetails.driverLicenseNumber}</li>
    <li>Paid: ${createdBooking.isPaid}</li>
    <li>Verified: ${createdBooking.isVerified} </li>
    </ul>
    `

    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    })
    transporter
      .sendMail({
        from: 'Banger and Co<bangerandco4@gmail.com>',
        to: user.email,
        subject: `Booking confirmation ${createdBooking._id}`,
        html: emailBody,
      })
      .then((info) => {
        console.log({ info })
      })
      .catch(console.error)
  }
})

// @desc    get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingbyId = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('vehicle')
    .populate('equipments')

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
