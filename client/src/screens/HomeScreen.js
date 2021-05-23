import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Vehicle from '../components/Vehicle'
import axios from 'axios'

const HomeScreen = () => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await axios.get('/api/vehicles')

      setVehicles(data)
    }

    fetchVehicles()
  }, [])

  return (
    <div>
      <h1>Vehicles</h1>
      <Row>
        {vehicles.map((vehicle) => (
          <Col key={vehicle._id} sm={12} md={6} lg={4} xl={3}>
            <Vehicle vehicle={vehicle} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
