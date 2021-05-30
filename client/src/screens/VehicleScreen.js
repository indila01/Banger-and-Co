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
    dispatch(saveVehicleDetails(vehicle))
    history.push('/login?redirect=driverDetails')
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
                  {/* <Col> */}
                  {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                  {/* </Col> */}
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
      )}
    </>
  )
}

export default VehicleScreen
