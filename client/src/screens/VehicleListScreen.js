import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listVehicles,
  deleteVehicle,
  createVehicle,
} from '../actions/vehicleActions'
import { VEHICLE_CREATE_RESET } from '../constants/vehicleConstants'
import Paginate from '../components/Paginate'
import { MDBDataTable } from 'mdbreact'

const VehicleListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles, page, pages } = vehicleList

  const [tableData, setTableData] = useState({
    columns: [
      {
        label: 'LICENSE',
        field: 'licensePlateNumber',
        sort: 'ace',
        width: 150,
      },
      { label: 'NAME', field: 'name', sort: 'ace', width: 150 },
      { label: 'PRICE', field: 'pricePerDay', sort: 'ace', width: 150 },
      { label: 'TYPE', field: 'type', sort: 'ace', width: 150 },
      { label: 'SEATS', field: 'seats', sort: 'ace', width: 150 },
      { label: 'TRANSMISSION', field: 'transmission', sort: 'ace', width: 150 },
      { label: 'HORSEPOWER', field: 'horsepower', sort: 'ace', width: 150 },
      {
        label: 'ENGINE CAPACITY',
        field: 'engine',
        sort: 'ace',
        width: 150,
      },
      { label: 'MPG', field: 'miles_per_gallon', sort: 'ace', width: 150 },
      { label: 'ACTION', field: 'action', sort: 'ace', width: 150 },
    ],
    rows: [],
  })

  const vehicleDelete = useSelector((state) => state.vehicleDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = vehicleDelete

  const vehicleCreate = useSelector((state) => state.vehicleCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    vehicle: createdVehicle,
  } = vehicleCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: VEHICLE_CREATE_RESET })
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/vehicle/${createdVehicle._id}/edit`)
    } else {
      dispatch(listVehicles('', pageNumber, ''))
      if (vehicles) {
        setTableData({
          ...tableData,
          rows: [
            ...vehicles.map((vehicle) => ({
              name: vehicle.name,
              licensePlateNumber: vehicle.licensePlateNumber,
              pricePerDay: vehicle.pricePerDay,
              type: vehicle.type,
              seats: vehicle.seats,
              transmission: vehicle.transmission,
              horsepower: vehicle.horsepower,
              engine: vehicle.engine,
              miles_per_gallon: vehicle.miles_per_gallon,
              action: (
                <>
                  <LinkContainer to={`/admin/vehicle/${vehicle._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(vehicle._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </>
              ),
            })),
          ],
        })
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdVehicle,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteVehicle(id))
    }
  }
  const createVehicleHandler = () => {
    dispatch(createVehicle())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Vehicles</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createVehicleHandler}>
            <i className='fas fa-plus'></i> Create Vehicle
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <MDBDataTable striped bordered small data={tableData} />

          {/* eslint-disable-next-line */}
          {vehicles == 0 && <Message>Vehicles are not available </Message>}
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default VehicleListScreen
