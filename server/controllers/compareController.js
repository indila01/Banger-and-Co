import { json } from 'express'
import asyncHandler from 'express-async-handler'
import axios from 'axios'

// @desc    Get all users
// @route   GET  /api/user/
// @access  Private/admin
const compareDetails = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    'https://bangerexternalapi.azurewebsites.net/api/prices'
  )
  res.json(data)
})

export { compareDetails }
