import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const Equipment = ({ equipment }) => {
  return (
    <Row noGutters>
      <Col md={4}>
        <Card.Img src={equipment.image} />
      </Col>
      <Col md={8}>
        <Card.Body>
          <Card.Title as='h6'>
            <strong>{equipment.name}</strong>
          </Card.Title>
          <Card.Text className='my-0' as='p'>
            price: {equipment.price}
          </Card.Text>
        </Card.Body>
      </Col>
    </Row>
  )
}

export default Equipment
