const express = require('express')
const vehicles = require('./data/vehicles')

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

app.listen(5000, console.log('Server running on port 5000'))
