import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import vehicles from './data/vehicles.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/vehicles', (req, res) => {
  res.json(vehicles)
})

app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find((p) => p._id === req.params.id)
  res.json(vehicle)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
