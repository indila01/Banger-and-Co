import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const VehicleScreen = ({ match }) => {
  const [vehicle, setVehicle] = useState({})

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data } = await axios.get(`/api/vehicles/${match.params.id}`)

      setVehicle(data)
    }

    fetchVehicle()
  }, [])
  return (
    <>
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
            <ListGroup.Item>Price: ${vehicle.price}</ListGroup.Item>
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
                    <strong>${vehicle.price_per_day}</strong>
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
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default VehicleScreen
