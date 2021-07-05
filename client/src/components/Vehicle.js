import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Vehicle = ({ vehicle }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/vehicle/${vehicle._id}`}>
        <Card.Img src={vehicle.image} variant='top' />
      </Link>

      <Card.Body>
        <Card.Title className='mb-0' as='div'>
          <strong>{vehicle.name}</strong>
        </Card.Title>
        <Card.Text className='mt-0' as='p'>
          {vehicle.type}
        </Card.Text>

        <Card.Text as='div'>
          <Rating
            value={vehicle.rating}
            text={`${vehicle.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${vehicle.pricePerDay}</Card.Text>
        <Link to={`/vehicle/${vehicle._id}`}>
          <Button
            style={{ width: '100%' }}
            type='button'
            className='btn-block'
            variant='success'
          >
            View
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Vehicle
