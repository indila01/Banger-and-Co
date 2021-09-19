import express from 'express'
const router = express.Router()
import { compareDetails } from '../controllers/compareController.js'

router.route('/').get(compareDetails)

export default router
