import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Vehicle from './Vehicle'

const Equipment = ({ equipment }) => {
  return (
    <Card className='mx-3 mb-1 rounded equipmentcard'>
      <Row noGutters>
        <Col md={4}>
          <Card.Img src={equipment.image} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title as='div'>
              {' '}
              <strong>{equipment.name}</strong>
            </Card.Title>
            <Card.Text className='mt-0' as='p'>
              price: {equipment.price}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default Equipment
