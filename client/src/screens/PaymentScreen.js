import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/bookingAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const bookingDetails = useSelector((state) => state.bookingDetails)
  const { driverDetails } = bookingDetails

  if (!driverDetails) {
    history.push('/booking')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/confirmBooking')
  }

  const dispatch = useDispatch()

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit card'
              id='PayPal'
              name='paymentMethod'
              value='value'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' varient='primery'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
