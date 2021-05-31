import asyncHandler from 'express-async-handler'
import Vehicle from '../models/vehicleModel.js'

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({})

  res.json(vehicles)
})

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)

  if (vehicle) {
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

export {
  getVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  createVehicle,
}
