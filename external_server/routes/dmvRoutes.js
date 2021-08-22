import express from 'express'
const router = express.Router()
import {
  getSuspenededLicense,
  notifyDmv,
} from '../controllers/dmvController.js'

router.route('/').get(getSuspenededLicense).post(notifyDmv)

export default router
