import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listVehicleDetails, updateVehicle } from '../actions/vehicleActions'
import { VEHICLE_UPDATE_RESET } from '../constants/vehicleConstants'
import axios from 'axios'

const VehicleEditScreen = ({ match, history }) => {
  const vehicleId = match.params.id

  const [name, setName] = useState('')
  const [licensePlateNumber, setLicensePlateNumber] = useState('')
  const [availability, setAvailability] = useState(false)
  const [miles_per_gallon, setMiles_per_gallon] = useState(0)
  const [cylinders, setCylinders] = useState(0)
  const [horsepower, setHorsepower] = useState(0)
  const [transmission, setTransmission] = useState('')
  const [type, setType] = useState('')
  const [fuel, setFuel] = useState('')
  const [engine, setEngine] = useState(0)
  const [seats, setseats] = useState(0)
  const [pricePerDay, setPricePerDay] = useState(0)
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const vehicleDetails = useSelector((state) => state.vehicleDetails)
  const { loading, error, vehicle } = vehicleDetails

  const vehicleUpdate = useSelector((state) => state.vehicleUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vehicleUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VEHICLE_UPDATE_RESET })
      history.push('/admin/vehiclelist')
    } else {
      if (!vehicle.name || vehicle._id !== vehicleId) {
        dispatch(listVehicleDetails(vehicleId))
      } else {
        setName(vehicle.name)
        setLicensePlateNumber(vehicle.licensePlateNumber)
        setAvailability(vehicle.availability)
        setMiles_per_gallon(vehicle.miles_per_gallon)
        setCylinders(vehicle.cylinders)
        setHorsepower(vehicle.horsepower)
        setTransmission(vehicle.transmission)
        setType(vehicle.type)
        setFuel(vehicle.fuel)
        setEngine(vehicle.engine)
        setseats(vehicle.seats)
        setPricePerDay(vehicle.pricePerDay)
        setImage(vehicle.image)
      }
    }
  }, [dispatch, vehicleId, vehicle, history, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVehicle({
        _id: vehicleId,
        name,
        licensePlateNumber,
        availability,
        miles_per_gallon,
        cylinders,
        horsepower,
        transmission,
        type,
        fuel,
        engine,
        seats,
        pricePerDay,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/vehiclelist' className='btn  btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Vehicle</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Vehicle Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>License number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter license number'
                    value={licensePlateNumber}
                    onChange={(e) => setLicensePlateNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='type'>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Vehicle Type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='seats'>
              <Form.Label>No. of Seats</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Number of Seats'
                value={seats}
                onChange={(e) => setseats(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='transmission'>
              <Form.Label>Transmission</Form.Label>
              <Form.Control
                type='text'
                placeholder='Automatic/Manual'
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='fuel'>
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Select Fuel Type'
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='horsepower'>
              <Form.Label>Horsepower</Form.Label>
              <Form.Control
                type='number'
                placeholder='HP'
                step='.1'
                value={horsepower}
                onChange={(e) => setHorsepower(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='engine'>
              <Form.Label>Engine Capacity</Form.Label>
              <Form.Control
                type='number'
                placeholder='L'
                step='.1'
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='milespergallon'>
              <Form.Label>Miles Per Gallon</Form.Label>
              <Form.Control
                type='number'
                step='.1'
                placeholder='mpg'
                value={miles_per_gallon}
                onChange={(e) => setMiles_per_gallon(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='cylinders'>
              <Form.Label>Cylinders</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Cylinders'
                value={cylinders}
                onChange={(e) => setCylinders(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='priceperday'>
              <Form.Label>Price Per Day</Form.Label>
              <Form.Control
                type='number'
                step='.01'
                placeholder='Enter Price Per Day'
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='availability'>
              <Form.Check
                type='checkbox'
                label='Availability'
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              type='submit'
              variant='success'
              className='my-3'
              style={{ width: '100%' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default VehicleEditScreen
