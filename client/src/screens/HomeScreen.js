import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container, Button } from 'react-bootstrap'
import Vehicle from '../components/Vehicle'
import { listVehicles } from '../actions/vehicleActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
// import VehicleCarousel from '../components/VehicleCarousel'

const HomeScreen = ({ match }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    },
  ])
  const [searchDate, setSearchDate] = useState(date)
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles, page, pages } = vehicleList

  useEffect(() => {
    dispatch(listVehicles(keyword, pageNumber, searchDate))
  }, [dispatch, keyword, pageNumber, searchDate])

  const searchDateHandler = () => {
    setSearchDate(date)
  }
  return (
    <div>
      <Container color='red'>
        <Row className='justify-content-md-center'>
          <Col md='mr'>
            <DateRange
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              onChange={(item) => setDate([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              rangeColors={['#2fb380']}
              ranges={date}
              direction='horizontal'
              dateDisplayFormat='MM/dd/yyyy'
            />
          </Col>
        </Row>
        <Button className='btn-block' type='button' onClick={searchDateHandler}>
          Search
        </Button>
      </Container>

      {/* {!keyword && <VehicleCarousel />} */}
      <h1>Vehicles</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {vehicles.map((vehicle) => (
              <Col key={vehicle._id} sm={12} md={6} lg={4} xl={3}>
                <Vehicle vehicle={vehicle} />
              </Col>
            ))}
          </Row>
          {/* eslint-disable-next-line */}
          {vehicles == 0 && <Message>Vehicles are not available </Message>}
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
