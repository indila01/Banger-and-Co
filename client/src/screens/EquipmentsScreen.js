import React, { useEffect } from 'react'
import { Col, Card, Row, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import CheckoutSteps from '../components/CheckoutSteps'
import Equipment from '../components/Equipment'
import { listEquipments } from '../actions/equipmentAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Stepper from '../components/Stepper'

const EquipmentsScreen = ({ history }) => {
  const equipmentList = useSelector((state) => state.equipmentList)
  const { loading, error, equipments } = equipmentList

  const dispatch = useDispatch()

  const submitEquipmenttHandler = () => {
    history.push('/login?redirect=driverDetails')
  }
  const skiptHandler = () => {
    history.push('/login?redirect=driverDetails')
  }
  // const addEquipmenttHandler = (id) => {
  //   console.log('asd')
  // }
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
                        <Equipment equipment={equipment} />
                        <Row>
                          <Col md={7}></Col>
                          <Col md={2}>
                            <Button
                              type='button'
                              className='btn-block px-5 mx-3'
                              variant='success'
                              // onClick={addEquipmenttHandler(equipment._id)}
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
              </ListGroup.Item>

              <ListGroup.Item className='mx-auto'>
                <Button
                  type='button'
                  className='btn-block px-5 mx-3'
                  variant='success'
                  onClick={submitEquipmenttHandler}
                  // disabled={addedEqipments == 0 && true}
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
