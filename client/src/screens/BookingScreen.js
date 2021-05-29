import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getBookingDetails } from '../actions/bookingAction'

const BookingScreen = ({ match }) => {
  const bookingId = match.params.id
  const dispatch = useDispatch()

  const bookingDetailsById = useSelector((state) => state.bookingDetailsById)
  const { booking, loading, error } = bookingDetailsById

  useEffect(() => {
    dispatch(getBookingDetails(bookingId))
  }, [dispatch, bookingId])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Booking {booking._id}</h1>
      {booking.isVerified ? (
        <Message variant='success'>
          Booking verified {booking.verifiedAt}
        </Message>
      ) : (
        <Message variant='danger'>Booking not verified</Message>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{booking.vehicle.name} </h2>
              <p>{booking.vehicle.type}</p>

              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <Image
                        src={booking.vehicle.image}
                        alt={booking.vehicle.image}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <i className='far fa-user me-1'></i>
                          {booking.vehicle.seats} Seats
                        </Col>
                        <Col>
                          <i className='fas fa-cogs me-1'></i>
                          {booking.vehicle.transmission}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <i className='fas fa-gas-pump me-1'></i>
                          {booking.vehicle.fuel}
                        </Col>
                        <Col>
                          <i className='fas fa-bolt me-1'></i>
                          {booking.vehicle.horsepower} HP
                        </Col>
                      </Row>
                      <Row>
                        <Col>{booking.vehicle.engine} L</Col>
                        <Col>{booking.vehicle.miles_per_gallon} mpg</Col>
                      </Row>
                      <Row>
                        <Col>{booking.vehicle.cylinders} cylinders</Col>
                      </Row>
                    </Col>
                    {/* <Col> */}
                    {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                    {/* </Col> */}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Driver Details</h2>
              <p className='my-0'>
                <strong>Name : </strong>
                {booking.driverDetails.driverName}
              </p>
              <p className='my-0'>
                <strong>Email : </strong>
                {booking.driverDetails.driverEmail}
              </p>
              <p className='my-0'>
                <strong>Contact Number : </strong>
                {booking.driverDetails.driverContactNumber}
              </p>
              <p className='my-0'>
                <strong>Address : </strong>
                {booking.driverDetails.driverAddress}
              </p>
              <p className='my-0'>
                <strong>NIC : </strong>
                {booking.driverDetails.driverNIC}
              </p>
              <p className='my-0'>
                <strong>Driving License : </strong>
                {booking.driverDetails.driverLicenseNumber}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {booking.paymentMethod}
              </p>
              {booking.isPaid ? (
                <Message variant='success'>Paid on {booking.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Booking Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price Per day</Col>
                  <Col> {booking.vehicle.pricePerDay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Car Rental Price</Col>
                  <Col>
                    {' '}
                    {booking.numberOfDays} * {booking.vehicle.pricePerDay}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${booking.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${booking.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default BookingScreen
