import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  ListGroup,
  Card,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Equipment from '../components/Equipment'
import { listEquipments } from '../actions/equipmentAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const EquipmentsScreen = ({ history }) => {
  const equipmentList = useSelector((state) => state.equipmentList)
  const { loading, error, equipments } = equipmentList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listEquipments())
  }, [dispatch])

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Equipements</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // <Row>

        <Card className='overflow-auto p-1' style={{ maxHeight: '560px' }}>
          {equipments.map((equipment) => (
            <Col key={equipment._id}>
              <Equipment equipment={equipment} />
            </Col>
          ))}
        </Card>

        // </Row>
      )}
    </FormContainer>
  )
}

export default EquipmentsScreen
