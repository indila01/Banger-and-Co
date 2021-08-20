import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'

//routes
import dmvRoutes from './routes/dmvRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('External API is running...')
})

app.use('/api/dmv', dmvRoutes)

const PORT = process.env.PORT || 3131

app.listen(
  PORT,
  console.log(
    `External Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .green.bold.inverse
  )
)
