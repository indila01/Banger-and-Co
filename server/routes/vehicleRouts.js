import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Vehicle from '../models/vehicleModel.js'

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({})
    res.json(vehicles)
  })
)

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id)

    if (vehicle) {
      res.json(vehicle)
    } else {
      res.status(404)
      throw new Error('Vehicle not found')
    }
  })
)

export default router
