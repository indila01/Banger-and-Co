import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Vehicle from '../components/Vehicle'
import { listVehicles } from '../actions/vehicleActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
// import VehicleCarousel from '../components/VehicleCarousel'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles, page, pages } = vehicleList

  useEffect(() => {
    dispatch(listVehicles(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      {/* {!keyword && <VehicleCarousel />} */}
      <h1>Vehicles</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {vehicles.map(
              (vehicle) =>
                vehicle.availability && (
                  <Col key={vehicle._id} sm={12} md={6} lg={4} xl={3}>
                    <Vehicle vehicle={vehicle} />
                  </Col>
                )
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  )
}

export default HomeScreen
