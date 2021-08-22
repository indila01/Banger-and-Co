import asyncHandler from 'express-async-handler'
import fs from 'fs'
import neatCsv from 'neat-csv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// @desc    Get all suspended and lost license numbers
// @route   get /api/dmv
// @access  public
const getSuspenededLicense = asyncHandler(async (req, res) => {
  try {
    //access csv file
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const lisnese_dir = `${__dirname}/../public_records/licenses.csv`

    //read csv file
    fs.readFile(lisnese_dir, async (err, data) => {
      if (err) {
        return res.status(500).send('Server error')
      }
      //parse records in file to an array of objects
      const records = await neatCsv(data)

      return res.send(records)
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
})

// @desc     send notification to DMV
// @route   post /api/dmv
// @access  public
const notifyDmv = asyncHandler(async (req, res) => {
  const emailBody = `<h1>Booking Confirmation Completed</h1>
    <h3>${vehicle.name}</h3>
    <h6>${vehicle.licensePlateNumber}</h6>
    <ul>
    <li>Driver Name: ${createdBooking.driverDetails.driverFirstName} ${createdBooking.driverDetails.driverLastName}</li>
    <li>Driver NIC: ${createdBooking.driverDetails.driverNIC} </li>
    <li>Driver License: ${createdBooking.driverDetails.driverLicenseNumber}</li>
    <li>Paid: ${createdBooking.isPaid}</li>
    <li>Verified: ${createdBooking.isVerified} </li>
    </ul>
    `

  const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })
  transporter
    .sendMail({
      from: 'Banger and Co<bangerandco4@gmail.com>',
      to: user.email,
      subject: `Booking confirmation ${createdBooking._id}`,
      html: emailBody,
    })
    .then((info) => {
      console.log({ info })
      res.status(200)
    })
    .catch(res.status(500))
})

export { getSuspenededLicense, notifyDmv }
