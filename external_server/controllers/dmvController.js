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

export { getSuspenededLicense }
