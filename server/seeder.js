import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import users from './data/users.js'
import vehicles from './data/vehicles.js'
import equipments from './data/equipments.js'

import User from './models/userModel.js'
import Vehicle from './models/vehicleModel.js'
import Booking from './models/bookingModel.js'
import Equipment from './models/equipmentModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Booking.deleteMany()
    await Vehicle.deleteMany()
    await User.deleteMany()
    await Equipment.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleVehicles = vehicles.map((vehicle) => {
      return { ...vehicle, user: adminUser }
    })

    await Vehicle.insertMany(sampleVehicles)

    const sampleEquiments = equipments.map((equipment) => {
      return { ...equipment, user: adminUser }
    })

    await Equipment.insertMany(sampleEquiments)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Booking.deleteMany()
    await Vehicle.deleteMany()
    await User.deleteMany()
    await Equipment.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
