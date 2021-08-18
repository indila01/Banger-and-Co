import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyBookings } from '../actions/bookingAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    success,
    error: updateError,
    loading: updateLoding,
  } = userUpdateProfile

  const bookingListMy = useSelector((state) => state.bookingListMy)
  const {
    loading: loadingBookings,
    error: errorBookings,
    bookings,
  } = bookingListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMyBookings())
      if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setContactNumber(user.contactNumber)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, user, dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          firstName,
          lastName,
          contactNumber,
          email,
          password,
        })
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error ||
          (updateError && (
            <Message variant='danger'>{error || updateError}</Message>
          ))}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && updateLoding && <Loader />}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group controlId='firstname'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='lastname'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId='contact'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='tel'
              placeholder='Enter contact number'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='my-3'
            style={{ width: '100%' }}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Booking History</h2>
        {loadingBookings ? (
          <Loader />
        ) : errorBookings ? (
          <Message variant='danger'>{errorBookings}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>VEHICLE LICENSE</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Verified</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.vehicle.licensePlateNumber}</td>
                    <td>{booking.createdAt.substring(0, 10)}</td>
                    <td>{booking.totalPrice}</td>
                    <td>
                      {booking.isPaid ? (
                        booking.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {booking.isVerified ? (
                        booking.verifiedAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/booking/${booking._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* eslint-disable-next-line */}
            {bookings == 0 && <Message>Bookings are not available </Message>}
          </>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
