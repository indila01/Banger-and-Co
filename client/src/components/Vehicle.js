import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Vehicle = ({ vehicle }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/vehicle/${vehicle._id}`}>
        <Card.Img src={vehicle.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/vehicle/${vehicle._id}`}>
          <Card.Title as='div'>
            <strong>{vehicle.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={vehicle.rating}
            text={`${vehicle.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${vehicle.price_per_day}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Vehicle
