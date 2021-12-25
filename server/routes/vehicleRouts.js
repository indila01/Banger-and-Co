import express from 'express'
const router = express.Router()
import {
  getVehicleById,
  getVehicles,
  deleteVehicle,
  updateVehicle,
  createVehicle,
  createVehicleReview,
  getTopVehicles,
  getBookedStatus,
} from '../controllers/vehicleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getVehicles).post(protect, admin, createVehicle)
router.route('/:id/reviews').post(protect, createVehicleReview)
router.get('/top', getTopVehicles)
router
  .route('/:id')
  .get(getVehicleById)
  .delete(protect, admin, deleteVehicle)
  .put(protect, admin, updateVehicle)

router.route('/:id/booked').get(getBookedStatus)

export default router
