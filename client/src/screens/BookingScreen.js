import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveDriverDetails } from '../actions/bookingAction'

const BookingScreen = ({ history }) => {
  const [driverName, setDriverName] = useState('')
  const [driverEmail, setDriverEmail] = useState('')
  const [driverContactNumber, setDriverContactNumber] = useState('')
  const [driverAddress, setDriverAddress] = useState('')
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('')
  const [driverNIC, setDriverNIC] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveDriverDetails({
        driverName,
        driverEmail,
        driverContactNumber,
        driverAddress,
        driverLicenseNumber,
        driverNIC,
      })
    )
    history.push('/payment')
  }

  const dispatch = useDispatch()

  return (
    <FormContainer>
      <h1>Driver Details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='driverName'>
          <Form.Label>Driver name</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter driver name'
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='driverEmail'>
          <Form.Label>Driver email</Form.Label>
          <Form.Control
            type='email'
            required
            placeholder='Enter driver email'
            value={driverEmail}
            onChange={(e) => setDriverEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='driverContactNumber'>
          <Form.Label>Driver Contact Number</Form.Label>
          <Form.Control
            type='tel'
            required
            placeholder='Enter driver contact number'
            value={driverContactNumber}
            onChange={(e) => setDriverContactNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='driverAddress'>
          <Form.Label>Driver Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter driver addressr'
            value={driverAddress}
            onChange={(e) => setDriverAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='driverLicenseNumber'>
          <Form.Label>Driver License Number</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter driver license number'
            value={driverLicenseNumber}
            onChange={(e) => setDriverLicenseNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='driverNIC'>
          <Form.Label>Driver NIC</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter driver NIC number'
            value={driverNIC}
            onChange={(e) => setDriverNIC(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primery'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default BookingScreen
