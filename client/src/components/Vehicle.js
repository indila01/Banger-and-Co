import React from 'react'
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Rating from './Rating'

const Vehicle = ({ vehicle }) => {
  const compareVehicles = useSelector((state) => state.vehicleCompare)
  const { compare } = compareVehicles
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

          {compare && (
            <OverlayTrigger
              delay={{ show: 250 }}
              overlay={
                <Tooltip id='open-tooltip'>
                  <div className='my-1 '>
                    <div className='d-flex'>
                      <strong>Compare prices with kayak</strong>
                    </div>
                    {compare.map((element) => (
                      <p className='my-0 d-flex '>
                        {element.model} : {element.price}
                      </p>
                    ))}
                  </div>
                </Tooltip>
              }
              placement='top'
            >
              <i className=' mx-2 fas fa-info-circle' />
            </OverlayTrigger>
          )}

          {/* <div
            style={{
              display: 'inline-block',
              maxWidth: '50vh',
              // position: 'absolute',
            }}
          >
            <MDBTooltip>
              <p>
                <i className=' mx-2 fas fa-info-circle' />
              </p>
              <div className='my-1'>
                <div>Compare prices </div>
                {compare.map((element) => (
                  <p className='my-0'>
                    {element.model} : {element.price}
                  </p>
                ))}
              </div>
            </MDBTooltip>
          </div> */}

          {/* <i class=' mx-2 fas fa-info-circle'></i> */}
        </Card.Text>

        <Card.Text as='div'>
          <Rating
            value={vehicle.rating}
            text={`${vehicle.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${vehicle.pricePerDay}</Card.Text>

        {vehicle.isBooked ? (
          <Button
            style={{ width: '100%' }}
            type='button'
            className='btn-block'
            variant='warning'
            disabled={true}
          >
            Booked
          </Button>
        ) : vehicle.availability ? (
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
        ) : (
          <Button
            style={{ width: '100%' }}
            type='button'
            className='btn-block'
            variant='dark'
            disabled={true}
          >
            Not available
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Vehicle
