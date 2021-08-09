import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {
  listVehicleDetails,
  createVehicleReview,
} from '../actions/vehicleActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  saveBookingDetails,
  saveVehicleDetails,
} from '../actions/bookingAction'
import { VEHICLE_CREATE_REVIEW_RESET } from '../constants/vehicleConstants'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const VehicleScreen = ({ match, history }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    },
  ])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [totalCost, setTotalCost] = useState(0)
  const [numberOfDays, setNumberOfDays] = useState(0)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const vehicleDetails = useSelector((state) => state.vehicleDetails)
  const { loading, error, vehicle } = vehicleDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const vehicleReviewCreate = useSelector((state) => state.vehicleReviewCreate)
  const { success: successVehicleReview, error: errorVehicleReview } =
    vehicleReviewCreate

  const checkoutHandler = () => {
    if (userInfo) {
      const today = new Date()
      const birthday = new Date(userInfo.DOB)
      var age_now = today.getFullYear() - birthday.getFullYear()
      const m = today.getMonth() - birthday.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age_now--
      }

      if (age_now < 25 && vehicle.type !== 'Small Town Car') {
        setMessage('Youre below 25, You can only checkout small town cars.')
      } else {
        dispatch(saveVehicleDetails(vehicle))
        const startDate = date[0].startDate
        const endDate = date[0].endDate
        dispatch(
          saveBookingDetails({ totalCost, startDate, endDate, numberOfDays })
        )
        history.push('/login?redirect=driverDetails')
      }
    } else {
      history.push('/login')
    }
  }

  const calNumberOfDays = (e) => {
    e.preventDefault()
    const startDate = new Date(date[0].startDate)
    const endDate = new Date(date[0].endDate)
    let dayCount = 0
    while (endDate > startDate) {
      dayCount++
      startDate.setDate(startDate.getDate() + 1)
    }

    setNumberOfDays(dayCount)
    setTotalCost(dayCount * vehicle.pricePerDay)
    dispatch(listVehicleDetails(match.params.id, date))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createVehicleReview(match.params.id, { rating, comment }))
  }

  useEffect(() => {
    if (successVehicleReview) {
      setRating(0)
      setComment('')
      dispatch({ type: VEHICLE_CREATE_REVIEW_RESET })
    }
    if (!vehicle || !vehicle.name || vehicle._id !== match.params.id) {
      dispatch(listVehicleDetails(match.params.id, date))
    }
  }, [dispatch, match, successVehicleReview, vehicle, date])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='justify-content-md-center'>
            <Col md={7}>
              <Image src={vehicle.image} alt={vehicle.name} fluid rounded />
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='py-0'>{vehicle.name}</h3>
                  <h6>{vehicle.licensePlateNumber}</h6>
                  {vehicle.type}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <i className='far fa-user me-1'></i>
                          {vehicle.seats} Seats
                        </Col>
                        <Col>
                          <i className='fas fa-cogs me-1'></i>
                          {vehicle.transmission}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <i className='fas fa-gas-pump me-1'></i>
                          {vehicle.fuel}
                        </Col>
                        <Col>
                          <i className='fas fa-bolt me-1'></i>
                          {vehicle.horsepower} HP
                        </Col>
                      </Row>
                      <Row>
                        <Col>{vehicle.engine} L</Col>
                        <Col>{vehicle.miles_per_gallon} mpg</Col>
                      </Row>
                      <Row>
                        <Col>{vehicle.cylinders} cylinders</Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={vehicle.rating}
                    text={`${vehicle.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4 className='py-2'>Rent Details</h4>
                    {message && <Message variant='warning'>{message}</Message>}
                    {numberOfDays > 14 && (
                      <Message variant='warning'>
                        Cannot book for more than 14 days
                      </Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className='justify-content-md-center'>
                      <Col md='auto'>
                        <DateRange
                          minDate={new Date()}
                          maxDate={addDays(new Date(), 30)}
                          onChange={(item) => setDate([item.selection])}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          rangeColors={['#2fb380']}
                          ranges={date}
                          direction='horizontal'
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      style={{ width: '100%' }}
                      className='btn-block'
                      type='button'
                      variant='success'
                      onClick={calNumberOfDays}
                    >
                      Calculate cost
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price per day:</Col>
                      <Col>
                        <strong>${vehicle.pricePerDay}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>No. of days</Col>
                      <Col>
                        <strong>{numberOfDays}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total cost </Col>
                      <Col>
                        <strong>${totalCost}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {vehicle.isBooked
                          ? 'Booked'
                          : !vehicle.availability
                          ? 'Not Available'
                          : 'Available'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        style={{ width: '100%' }}
                        className='btn-block'
                        type='button'
                        disabled={
                          numberOfDays < 1 ||
                          numberOfDays > 14 ||
                          !vehicle.availability ||
                          vehicle.isBooked
                        }
                        onClick={checkoutHandler}
                      >
                        Checkout
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            <Col md={7}>
              <h2 className='py-2'>Reviews</h2>

              {vehicle.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {vehicle.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <h2 className='py-2'>Write a customer review</h2>

              {errorVehicleReview && (
                <Message variant='danger'>{errorVehicleReview}</Message>
              )}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <ListGroup.Item>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </Form.Control>
                    </ListGroup.Item>
                  </Form.Group>

                  <Form.Group controlId='comment'>
                    <ListGroup.Item>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        type='submit'
                        className='my-3'
                        style={{ width: '100%' }}
                      >
                        Submit Review
                      </Button>
                    </ListGroup.Item>
                  </Form.Group>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default VehicleScreen
