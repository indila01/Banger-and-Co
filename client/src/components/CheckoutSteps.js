import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='stepCompleted'>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='stepNotCompleted' disabled>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/equipments'>
            <Nav.Link className='stepCompleted'>Equipments</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='stepNotCompleted' disabled>
            Equipments
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/driverDetails'>
            <Nav.Link className='stepCompleted'>Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='stepNotCompleted' disabled>
            Booking
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='stepCompleted'>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='stepNotCompleted' disabled>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step5 ? (
          <LinkContainer to='/confirmBooking'>
            <Nav.Link className='stepCompleted'>Confirm Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className='stepNotCompleted' disabled>
            Confirm Booking
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
