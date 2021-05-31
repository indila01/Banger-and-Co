import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listVehicles,
  deleteVehicle,
  createVehicle,
} from '../actions/vehicleActions'
import { VEHICLE_CREATE_RESET } from '../constants/vehicleConstants'

const VehicleListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const vehicleList = useSelector((state) => state.vehicleList)
  const { loading, error, vehicles } = vehicleList

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

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/vehicle/${createdVehicle._id}/edit`)
    } else {
      dispatch(listVehicles())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdVehicle,
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
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>NAME</th>
              <th>PRICE</th>
              <th>TYPE</th>
              <th>SEATS</th>
              <th>TRANSMISSION</th>
              <th>FUEL</th>
              <th>CYLINDERS</th>
              <th>HORSEPOWER</th>
              <th>ENGINE CAPACITY</th>
              <th>MPG</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                {/* <td>{vehicle._id}</td> */}
                <td>{vehicle.name}</td>
                <td>{vehicle.pricePerDay}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.seats}</td>
                <td>{vehicle.transmission}</td>
                <td>{vehicle.fuel}</td>
                <td>{vehicle.cylinders} </td>
                <td>{vehicle.horsepower} hp</td>
                <td>{vehicle.engine} L</td>
                <td>{vehicle.miles_per_gallon} mpg</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default VehicleListScreen
