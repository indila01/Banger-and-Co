import express from 'express'
const router = express.Router()
import {
  getVehicleById,
  getVehicles,
  deleteVehicle,
  updateVehicle,
  createVehicle,
} from '../controllers/vehicleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getVehicles).post(protect, admin, createVehicle)
router
  .route('/:id')
  .get(getVehicleById)
  .delete(protect, admin, deleteVehicle)
  .put(protect, admin, updateVehicle)

export default router
