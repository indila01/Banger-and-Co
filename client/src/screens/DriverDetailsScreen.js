import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveDriverDetails } from '../actions/bookingAction'
import CheckoutSteps from '../components/CheckoutSteps'

const DriverDetailsScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [driverFirstName, setDriverFirstName] = useState(userInfo.firstName)
  const [driverLastName, setDriverLastName] = useState(userInfo.lastName)
  const [driverEmail, setDriverEmail] = useState(userInfo.email)
  const [driverContactNumber, setDriverContactNumber] = useState(
    userInfo.contactNumber
  )
  const [driverAddress, setDriverAddress] = useState(userInfo.address)
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(
    userInfo.licenseNumber
  )
  const [driverNIC, setDriverNIC] = useState(userInfo.NIC)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveDriverDetails({
        driverFirstName,
        driverLastName,
        driverEmail,
        driverContactNumber,
        driverAddress,
        driverLicenseNumber,
        driverNIC,
      })
    )
    history.push('/payment')
  }
  const clear = () => {
    setDriverFirstName('')
    setDriverLastName('')
    setDriverEmail('')
    setDriverContactNumber('')
    setDriverAddress('')
    setDriverLicenseNumber('')
    setDriverNIC('')
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
      <Button className='my-3' onClick={clear} type='submit' varient='primary'>
        Add a new driver
      </Button>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group controlId='driverName'>
              <Form.Label>Driver first name</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter driver first name'
                value={driverFirstName}
                onChange={(e) => setDriverFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='driverName'>
              <Form.Label>Driver last Name</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter driver last name'
                value={driverLastName}
                onChange={(e) => setDriverLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

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
