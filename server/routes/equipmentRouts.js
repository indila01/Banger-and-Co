import express from 'express'
const router = express.Router()
import { getEquipments } from '../controllers/equipmentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getEquipments)

export default router
