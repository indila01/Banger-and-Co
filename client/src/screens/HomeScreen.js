import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
} from 'react-bootstrap'
import Vehicle from '../components/Vehicle'
import { listVehicles, compareDetails } from '../actions/vehicleActions'
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
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    searchDateHandler()
  }
  const handleShow = () => setShow(true)

  const [searchDate, setSearchDate] = useState(date)
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles, page, pages } = vehicleList

  // const compareVehicles = useSelector((state) => state.vehicleCompare)
  // const { loading: compareloading, success, compare } = compareDetails

  useEffect(() => {
    dispatch(listVehicles(keyword, pageNumber, searchDate))
    dispatch(compareDetails())
  }, [dispatch, keyword, pageNumber, searchDate])

  const searchDateHandler = () => {
    setSearchDate(date)
  }
  return (
    <div>
      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Body>
          <DateRange
            minDate={new Date()}
            maxDate={addDays(new Date(), 30)}
            onChange={(item) => setDate([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            rangeColors={['#febb02']}
            ranges={date}
            direction='horizontal'
            dateDisplayFormat='MM/dd/yyyy'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <h3 className='pb-0'>Let’s find your ideal car </h3>
      <p>Search, Compare & Save </p>
      <Container className='searchBar my-3'>
        <Form>
          <InputGroup style={{ height: '45px' }}>
            <Form.Control
              type='text'
              name='vehicle name'
              placeholder='🔎 Search Vehicles'
              onChange={(e) => setKeyword(e.target.value)}
              className='mr-sm-2 ml-sm-5'
            />

            <Form.Control
              type='text'
              name='dates'
              placeholder='Dates'
              className='mr-sm-2 ml-sm-5 mx-1'
              onClick={handleShow}
              value={`${date[0].startDate.toDateString()} - ${date[0].endDate.toDateString()}`}
            />

            <Button
              className='btn-block searchbutton'
              type='button'
              onClick={searchDateHandler}
            >
              Search
            </Button>
          </InputGroup>
        </Form>
      </Container>
      {/* {!keyword && <VehicleCarousel />} */}

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
