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
import { saveVehicleDetails } from '../actions/bookingAction'
import { VEHICLE_CREATE_REVIEW_RESET } from '../constants/vehicleConstants'

const VehicleScreen = ({ match, history }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const vehicleDetails = useSelector((state) => state.vehicleDetails)
  const { loading, error, vehicle } = vehicleDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const vehicleReviewCreate = useSelector((state) => state.vehicleReviewCreate)
  const { success: successVehicleReview, error: errorVehicleReview } =
    vehicleReviewCreate

  const checkoutHandler = () => {
    dispatch(saveVehicleDetails(vehicle))
    history.push('/login?redirect=driverDetails')
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
    dispatch(listVehicleDetails(match.params.id))
  }, [dispatch, match, successVehicleReview])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={vehicle.image} alt={vehicle.name} fluid rounded />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='py-0'>{vehicle.name}</h3>
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
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4 className='py-2'>Rent Details</h4>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${vehicle.pricePerDay}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {vehicle.availability === true
                          ? 'Available'
                          : 'Not available'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      style={{ width: '100%' }}
                      className='btn-block'
                      type='button'
                      disabled={vehicle.availability === false}
                      onClick={checkoutHandler}
                    >
                      Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
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
                      <Button type='submit' varient='primary'>
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
