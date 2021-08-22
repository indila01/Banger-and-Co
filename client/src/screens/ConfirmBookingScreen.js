import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
// import CheckoutSteps from '../components/CheckoutSteps'
import { createBooking } from '../actions/bookingAction'
import { BOOKING_VERIFY_RESET } from '../constants/bookingConstants'
import Stepper from '../components/Stepper'

const ConfirmBookingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const bookingDetails = useSelector((state) => state.bookingDetails)

  const startDate = new Date(bookingDetails.bookingDetails.startDate)

  const endDate = new Date(bookingDetails.bookingDetails.endDate)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const tax = addDecimals(
    Number((0.15 * bookingDetails.bookingDetails.totalCost).toFixed(2))
  )
  const totalPrice = (
    Number(bookingDetails.bookingDetails.totalCost) + Number(tax)
  ).toFixed(2)

  const bookingCreate = useSelector((state) => state.bookingCreate)
  const { booking, success, error } = bookingCreate

  useEffect(() => {
    if (userInfo) {
      if (success) {
        history.push(`/booking/${booking._id}`)
        dispatch({ type: BOOKING_VERIFY_RESET })
      }
    } else {
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [history, success, userInfo])

  const placeBooking = () => {
    dispatch(
      createBooking({
        vehicleDetails: bookingDetails.vehicleDetails,
        driverDetails: bookingDetails.driverDetails,
        paymentMethod: bookingDetails.paymentMethod,
        totalPrice: totalPrice,
        tax: tax,
        startDate: startDate,
        endDate: endDate,
        numberOfDays: bookingDetails.bookingDetails.numberOfDays,
      })
    )
  }

  return (
    <>
      <Stepper step1 step2 step3 step4 step5 />
      {/* <CheckoutSteps step1 step2 step3 step4 step5 /> */}
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
                      <h2 className='mb-0'>
                        {bookingDetails.vehicleDetails.name}
                      </h2>
                      <h6>
                        {bookingDetails.vehicleDetails.licensePlateNumber}
                      </h6>
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
                </Row>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h2>Driver Details</h2>
                  <p className='my-0'>
                    <strong>Name : </strong>
                    {bookingDetails.driverDetails.driverFirstName}{' '}
                    {bookingDetails.driverDetails.driverLastName}
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
                </Col>
                {bookingDetails.equipments && (
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <b>Equipments</b>
                      </ListGroup.Item>
                      {bookingDetails.equipments.map((equipment) => (
                        <ListGroup.Item className='py-2'>
                          <Row>
                            <Col>{equipment.name}</Col>
                            <Col>${equipment.price}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                )}
              </Row>
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
                <Row className='justify-content-md-center'>
                  <Col>Start Day</Col>
                  <Col>{startDate.toString().substring(0, 15)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='justify-content-md-center'>
                  <Col>End Day</Col>
                  <Col>{endDate.toString().substring(0, 15)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price Per day</Col>
                  <Col>
                    ${addDecimals(bookingDetails.vehicleDetails.pricePerDay)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>No. of Days</Col>
                  <Col>{bookingDetails.bookingDetails.numberOfDays}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price before Tax</Col>
                  <Col>
                    ${addDecimals(bookingDetails.bookingDetails.totalCost)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    ${tax} <strong> (15%)</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price after Tax</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}

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
