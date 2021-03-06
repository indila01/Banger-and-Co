import asyncHandler from 'express-async-handler'
import Vehicle from '../models/vehicleModel.js'
import Booking from '../models/bookingModel.js'

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const startDate = req.query.startDate ? new Date(req.query.startDate) : ''
  const endDate = req.query.endDate ? new Date(req.query.endDate) : ''
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Vehicle.countDocuments({ ...keyword })
  var vehicles = await Vehicle.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  if (startDate != '') {
    var bookedVehicles = await Booking.find({
      $or: [
        { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
        { startDate: { $gt: startDate }, endDate: { $lt: endDate } },
      ],
    }).populate('vehicle')

    for (var i = 0, len = vehicles.length; i < len; i++) {
      for (var j = 0, len2 = bookedVehicles.length; j < len2; j++) {
        if (vehicles[i].name === bookedVehicles[j].vehicle.name) {
          vehicles[i].isBooked = true
        }
      }
    }
  }

  res.json({ vehicles, page, pages: Math.ceil(count / pageSize) })
})

// @desc    check booked status
// @route   GET /api/booked
// @access  Public
const getBookedStatus = asyncHandler(async (req, res) => {
  const startDate = new Date(req.query.startDate)
  const endDate = new Date(req.query.endDate)

  var vehiclesId = req.params.id

  var bookedVehicles = await Booking.find({
    vehicle: vehiclesId,
    $or: [
      { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
      { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
      { startDate: { $gt: startDate }, endDate: { $lt: endDate } },
    ],
  })

  res.send(bookedVehicles)
})

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = asyncHandler(async (req, res) => {
  const startDate = req.query.startDate ? new Date(req.query.startDate) : ''
  const endDate = req.query.endDate ? new Date(req.query.endDate) : ''

  const vehicle = await Vehicle.findById(req.params.id)

  if (vehicle) {
    var bookedVehicles = await Booking.find({
      vehicle: vehicle._id,
      $or: [
        { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
        { startDate: { $gt: startDate }, endDate: { $lt: endDate } },
      ],
    })

    if (bookedVehicles != 0) {
      vehicle.isBooked = true
    }

    res.json(vehicle)
  } else {
    res.status(404)
    throw new Error('Vehicle not found')
  }
})

// @desc    delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  private/admin
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)

  if (vehicle) {
    await vehicle.remove()
    res.json({ message: 'Vehicle removed' })
  } else {
    res.status(404)
    throw new Error('Vehicle not found')
  }
})

// @desc    create a vehicle
// @route   POST /api/vehicles/
// @access  private/admin
const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = new Vehicle({
    type: 'Small town car',
    licensePlateNumber: 'AAA-0000',
    name: 'sample vehicle',
    miles_per_gallon: 0,
    cylinders: 3,
    horsepower: 130,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: 1.0,
    seats: 4,
    image: '/images/sample_vehicle.jpeg',
    pricePerDay: 40.0,
    numReviews: 0,
    availability: false,
    user: req.user._id,
  })
  const createdVehicle = await vehicle.save()
  res.status(201).json(createdVehicle)
})

// @desc    update a vehicle
// @route   PUT /api/vehicles/:id
// @access  private/admin
const updateVehicle = asyncHandler(async (req, res) => {
  const {
    type,
    name,
    licensePlateNumber,
    miles_per_gallon,
    cylinders,
    horsepower,
    transmission,
    fuel,
    engine,
    seats,
    image,
    pricePerDay,
    availability,
  } = req.body

  const vehicle = await Vehicle.findById(req.params.id)

  if (vehicle) {
    vehicle.type = type
    vehicle.name = name
    vehicle.licensePlateNumber = licensePlateNumber
    vehicle.miles_per_gallon = miles_per_gallon
    vehicle.cylinders = cylinders
    vehicle.horsepower = horsepower
    vehicle.transmission = transmission
    vehicle.fuel = fuel
    vehicle.engine = engine
    vehicle.seats = seats
    vehicle.image = image
    vehicle.pricePerDay = pricePerDay
    vehicle.availability = availability

    const updatedVehicle = await vehicle.save()
    res.json(updatedVehicle)
  } else {
    res.status(404)
    throw new Error('Vehicle not found')
  }
})

// @desc    create new review
// @route   POST /api/vehicles/:id/reviews
// @access  private
const createVehicleReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const vehicle = await Vehicle.findById(req.params.id)

  if (vehicle) {
    const alreadyReviewed = vehicle.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Vehicle already reviewed')
    }

    const review = {
      name: req.user.firstName + ' ' + req.user.lastName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    vehicle.reviews.push(review)
    vehicle.numReviews = vehicle.reviews.length
    vehicle.rating =
      vehicle.reviews.reduce((acc, item) => item.rating + acc, 0) /
      vehicle.reviews.length

    await vehicle.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Vehicle not found')
  }
})

// @desc    Get top reviewed vehicles
// @route   GET /api/vehicles/top
// @access  Public
const getTopVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({}).sort({ rating: -1 }).limit(3)

  res.json(vehicles)
})

export {
  getVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  createVehicle,
  createVehicleReview,
  getTopVehicles,
  getBookedStatus,
}
