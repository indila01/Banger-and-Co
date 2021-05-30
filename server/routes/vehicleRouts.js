import express from 'express'
const router = express.Router()
import {
  getVehicleById,
  getVehicles,
  deleteVehicle,
} from '../controllers/vehicleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getVehicles)
router.route('/:id').get(getVehicleById).delete(protect, admin, deleteVehicle)

export default router
