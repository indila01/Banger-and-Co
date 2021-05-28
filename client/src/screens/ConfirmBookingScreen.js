import React, { useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const ConfirmBookingScreen = () => {
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
    </div>
  )
}

export default ConfirmBookingScreen
