import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveDriverDetails } from '../actions/bookingAction'
import CheckoutSteps from '../components/CheckoutSteps'

const DriverDetailsScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const bookingDetails = useSelector((state) => state.bookingDetails)

  const { driverDetails } = bookingDetails

  const [driverName, setDriverName] = useState(driverDetails.driverName || '')
  const [driverEmail, setDriverEmail] = useState(
    driverDetails.driverEmail || ''
  )
  const [driverContactNumber, setDriverContactNumber] = useState(
    driverDetails.driverContactNumber || ''
  )
  const [driverAddress, setDriverAddress] = useState(
    driverDetails.driverAddress || ''
  )
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(
    driverDetails.driverLicenseNumber || ''
  )
  const [driverNIC, setDriverNIC] = useState(driverDetails.driverNIC || '')

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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, history])
  const dispatch = useDispatch()

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
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

        <Button
          className='my-3'
          style={{ width: '100%' }}
          type='submit'
          varient='primery'
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default DriverDetailsScreen
