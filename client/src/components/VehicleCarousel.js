import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopVehicles } from '../actions/vehicleActions'

const VehicleCarousel = () => {
  const dispatch = useDispatch()

  const vehicleTopRated = useSelector((state) => state.vehicleTopRated)
  const { loading, error, vehicles } = vehicleTopRated

  useEffect(() => {
    dispatch(listTopVehicles())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {vehicles.map((vehicle) => (
        <Carousel.Item key={vehicle._id}>
          <Link to={`/vehicle/${vehicle._id}`}>
            <Image src={vehicle.image} alt={vehicle.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {vehicle.name} (${vehicle.pricePerDay})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default VehicleCarousel
