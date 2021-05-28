import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listVehicleDetails } from '../actions/vehicleActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { saveVehicleDetails } from '../actions/bookingAction'

const VehicleScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const vehicleDetails = useSelector((state) => state.vehicleDetails)
  const { loading, error, vehicle } = vehicleDetails

  const checkoutHandler = () => {
    dispatch(saveVehicleDetails(vehicle.id))
    history.push('/login?redirect=booking')
  }

  useEffect(() => {
    dispatch(listVehicleDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={vehicle.image} alt={vehicle.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{vehicle.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={vehicle.rating}
                  text={`${vehicle.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${vehicle.pricePerDay}</ListGroup.Item>
              <ListGroup variant='flush'>
                <ListGroup.Item>seats: {vehicle.seats}</ListGroup.Item>
                <ListGroup.Item>
                  Miles per galon: {vehicle.miles_per_gallon}
                </ListGroup.Item>
              </ListGroup>
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
                    className='btn-block'
                    type='button'
                    disabled={vehicle.availability === false}
                    onClick={checkoutHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default VehicleScreen
