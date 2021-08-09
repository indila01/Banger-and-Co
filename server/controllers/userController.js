import { json } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../util/generateToken.js'

// @desc    Auth user and get JWT token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      NIC: user.NIC,
      licenseNumber: user.licenseNumber,
      contactNumber: user.contactNumber,
      isAdmin: user.isAdmin,
      isBlacklisted: user.isBlacklisted,
      isVerified: user.isVerified,
      DOB: user.birthday,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    contactNumber,
    address,
    NIC,
    licenseNumber,
    email,
    password,
    birthday,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exisis')
  }

  const user = await User.create({
    firstName,
    lastName,
    contactNumber,
    address,
    NIC,
    licenseNumber,
    email,
    password,
    birthday,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      licenseNumber: user.licenseNumber,
      NIC: user.NIC,
      contactNumber: user.contactNumber,
      isAdmin: user.isAdmin,
      isBlacklisted: user.isBlacklisted,
      isVerified: user.isVerified,
      DOB: user.birthday,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET  /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update Edit user profile
// @route   PUT  /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.contactNumber = req.body.contactNumber || user.contactNumber
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      contactNumber: updatedUser.contactNumber,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET  /api/user/
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete a user
// @route   DETELE  /api/user/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User Removed ' })
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})

// @desc    Get user by id
// @route   GET  /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})

// @desc    Update user
// @route   PUT  /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.contactNumber = req.body.contactNumber || user.contactNumber
    user.email = req.body.email || user.email
    user.licenseNumber = req.body.licenseNumber || user.licenseNumber
    user.NIC = req.body.NIC || user.NIC
    user.isAdmin = req.body.isAdmin
    user.isVerified = req.body.isVerified
    user.isBlacklisted = req.body.isBlacklisted

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      contactNumber: updatedUser.contactNumber,
      email: updatedUser.email,
      NIC: updatedUser.NIC,
      licenseNumber: updatedUser.licenseNumber,
      isAdmin: updatedUser.isAdmin,
      isVerified: updateUser.isVerified,
      isBlacklisted: updateUser.isBlacklisted,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
