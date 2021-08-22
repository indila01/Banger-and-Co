import React, { useEffect, useState } from 'react'
import { Col, Card, Row, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveEquipmentsDetails } from '../actions/bookingAction'
// import CheckoutSteps from '../components/CheckoutSteps'
// import Equipment from '../components/Equipment'
import { listEquipments } from '../actions/equipmentAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Stepper from '../components/Stepper'

const EquipmentsScreen = ({ history }) => {
  const equipmentList = useSelector((state) => state.equipmentList)
  const { loading, error, equipments } = equipmentList

  const [message, setMessage] = useState(null)
  const [addedEquipments, setaddedEquipments] = useState([])

  const dispatch = useDispatch()

  const submitEquipmenttHandler = () => {
    dispatch(saveEquipmentsDetails(addedEquipments))
    history.push('/login?redirect=driverDetails')
  }
  const skiptHandler = () => {
    dispatch(saveEquipmentsDetails())
    history.push('/login?redirect=driverDetails')
  }
  const addEquipmenttHandler = ({ equipment }) => {
    if (addedEquipments.length < 3) {
      setaddedEquipments([...addedEquipments, equipment])
    } else {
      setMessage('Cannot add more than 3 equipments')
    }
  }
  const clearEquipmentsHandler = () => {
    setaddedEquipments([])
    setMessage(null)
  }
  useEffect(() => {
    dispatch(listEquipments())
  }, [dispatch])

  return (
    <>
      <Stepper step1 step2 />
      {/* <CheckoutSteps step1 step2 /> */}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item
              className='overflow-auto p-1'
              style={{ maxHeight: '540px' }}
            >
              <Row style={{ maxWidth: '540px' }}>
                <h1 className='mx-2'>Equipements</h1>
              </Row>

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                equipments.map((equipment) => (
                  <Row key={equipment._id} style={{ maxWidth: '700px' }}>
                    <Col sm={12} md={12} lg={12} xl={12}>
                      <Card className='mx-3 mb-1 rounded equipmentcard'>
                        <Row noGutters>
                          <Col md={4}>
                            <Card.Img src={equipment.image} />
                          </Col>
                          <Col md={3}>
                            <Card.Body>
                              <Card.Title as='h6'>
                                <strong>{equipment.name}</strong>
                              </Card.Title>
                              <Card.Text className='my-0' as='p'>
                                price: ${equipment.price}
                              </Card.Text>
                            </Card.Body>
                          </Col>
                          <Col md={4} className='align-self-end'>
                            <Button
                              type='button'
                              className='btn-block px-5 mx-3 my-auto'
                              variant='success'
                              onClick={() => {
                                addEquipmenttHandler({ equipment })
                              }}
                            >
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Equipment Summery</h2>
                {message && <Message variant='warning'>{message}</Message>}
              </ListGroup.Item>
              {addedEquipments != 0 &&
                addedEquipments.map((addedEquipment) => (
                  <ListGroup.Item>
                    <Row>
                      <Col>{addedEquipment.name}</Col>
                      <Col>${addedEquipment.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              {addedEquipments.length > 0 && (
                <ListGroup.Item>
                  <Button
                    style={{ width: '100%' }}
                    type='button'
                    className='btn-block '
                    variant='danger'
                    onClick={() => {
                      clearEquipmentsHandler()
                    }}
                  >
                    clear
                  </Button>
                </ListGroup.Item>
              )}

              <ListGroup.Item className='mx-auto'>
                <Button
                  type='button'
                  className='btn-block px-5 mx-3'
                  variant='success'
                  onClick={submitEquipmenttHandler}
                  disabled={addedEquipments.length == 0 && true}
                >
                  Next
                </Button>
                <Button
                  type='button'
                  className='btn-block px-5 mx-3'
                  variant='info'
                  onClick={skiptHandler}
                >
                  Skip
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EquipmentsScreen
