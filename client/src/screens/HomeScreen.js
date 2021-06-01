import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Vehicle from '../components/Vehicle'
import { listVehicles } from '../actions/vehicleActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles } = vehicleList

  useEffect(() => {
    dispatch(listVehicles(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      <h1>Vehicles</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {vehicles.map((vehicle) => (
            <Col key={vehicle._id} sm={12} md={6} lg={4} xl={3}>
              <Vehicle vehicle={vehicle} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
