import express from 'express'
const router = express.Router()
import {
  getVehicleById,
  getVehicles,
} from '../controllers/vehicleController.js'

router.route('/').get(getVehicles)

router.route('/:id').get(getVehicleById)

export default router
