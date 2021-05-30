import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createBooking } from '../actions/bookingAction'

const ConfirmBookingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const bookingDetails = useSelector((state) => state.bookingDetails)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const tax = addDecimals(
    Number((0.15 * bookingDetails.vehicleDetails.pricePerDay).toFixed(2))
  )
  const totalPrice = (
    Number(bookingDetails.vehicleDetails.pricePerDay) + Number(tax)
  ).toFixed(2)

  const bookingCreate = useSelector((state) => state.bookingCreate)
  const { booking, success, error } = bookingCreate

  useEffect(() => {
    if (success) {
      history.push(`/booking/${booking._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeBooking = () => {
    dispatch(
      createBooking({
        vehicleDetails: bookingDetails.vehicleDetails,
        driverDetails: bookingDetails.driverDetails,
        paymentMethod: bookingDetails.paymentMethod,
        totalPrice: totalPrice,
        tax: tax,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {bookingDetails.vehicleDetails === null ? (
                <Message>Your have not selected a vehicle</Message>
              ) : (
                <Row>
                  <Col md={6}>
                    <Image
                      src={bookingDetails.vehicleDetails.image}
                      alt={bookingDetails.vehicleDetails.image}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={6}>
                    <Row>
                      <h2>{bookingDetails.vehicleDetails.name} </h2>
                      <p>{bookingDetails.vehicleDetails.type}</p>
                    </Row>
                    <Row>
                      <Col>
                        <i className='far fa-user me-1'></i>
                        {bookingDetails.vehicleDetails.seats} Seats
                      </Col>
                      <Col>
                        <i className='fas fa-cogs me-1'></i>
                        {bookingDetails.vehicleDetails.transmission}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <i className='fas fa-gas-pump me-1'></i>
                        {bookingDetails.vehicleDetails.fuel}
                      </Col>
                      <Col>
                        <i className='fas fa-bolt me-1'></i>
                        {bookingDetails.vehicleDetails.horsepower} HP
                      </Col>
                    </Row>
                    <Row>
                      <Col>{bookingDetails.vehicleDetails.engine} L</Col>
                      <Col>
                        {bookingDetails.vehicleDetails.miles_per_gallon} mpg
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {bookingDetails.vehicleDetails.cylinders} cylinders
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col> */}
                  {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                  {/* </Col> */}
                </Row>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Driver Details</h2>
              <p className='my-0'>
                <strong>Name : </strong>
                {bookingDetails.driverDetails.driverName}
              </p>
              <p className='my-0'>
                <strong>Email : </strong>
                {bookingDetails.driverDetails.driverEmail}
              </p>
              <p className='my-0'>
                <strong>Contact Number : </strong>
                {bookingDetails.driverDetails.driverContactNumber}
              </p>
              <p className='my-0'>
                <strong>Address : </strong>
                {bookingDetails.driverDetails.driverAddress}
              </p>
              <p className='my-0'>
                <strong>NIC : </strong>
                {bookingDetails.driverDetails.driverNIC}
              </p>
              <p className='my-0'>
                <strong>Driving License : </strong>
                {bookingDetails.driverDetails.driverLicenseNumber}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {bookingDetails.paymentMethod}
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
                  <Col>
                    {' '}
                    ${addDecimals(bookingDetails.vehicleDetails.pricePerDay)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Car Rental Price</Col>
                  <Col>
                    {' '}
                    ${addDecimals(bookingDetails.vehicleDetails.pricePerDay)} *
                    days
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  style={{ width: '100%' }}
                  type='button'
                  className='btn-block'
                  variant='success'
                  onClick={placeBooking}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ConfirmBookingScreen
