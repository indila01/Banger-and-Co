import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Stepper = ({ step1, step2, step3, step4, step5 }) => {
  return (
    <Row className='justify-content-center'>
      <Col md={10}>
        <ul className='stepper stepper-horizontal'>
          {step1 ? (
            <li className='completed'>
              <Link to='/login'>
                <span className='circle'>1</span>
                <span className='label'>Sign In</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to='#'>
                <span className='circle'>1</span>
                <span className='label'>Sign In</span>
              </Link>
            </li>
          )}
          {step2 ? (
            <li className='completed'>
              <Link to='/equipments'>
                <span className='circle'>2</span>
                <span className='label'>Equipments</span>
              </Link>
            </li>
          ) : (
            <li className='noMousePointer'>
              <Link>
                <span className='circle'>2</span>
                <span className='label'>Equipments</span>
              </Link>
            </li>
          )}
          {step3 ? (
            <li className='completed'>
              <Link to='/driverDetails'>
                <span className='circle'>3</span>
                <span className='label'>Booking</span>
              </Link>
            </li>
          ) : (
            <li className='noMousePointer'>
              <Link>
                <span className='circle'>3</span>
                <span className='label'>Booking</span>
              </Link>
            </li>
          )}
          {step4 ? (
            <li className='completed'>
              <Link to='/payment'>
                <span className='circle'>4</span>
                <span className='label'>Payment</span>
              </Link>
            </li>
          ) : (
            <li className='noMousePointer'>
              <Link>
                <span className='circle'>4</span>
                <span className='label'>Payment</span>
              </Link>
            </li>
          )}
          {step5 ? (
            <li className='completed'>
              <Link to='/confirmBooking'>
                <span className='circle'>5</span>
                <span className='label'>Confirm Booking</span>
              </Link>
            </li>
          ) : (
            <li className='noMousePointer'>
              <Link>
                <span className='circle'>5</span>
                <span className='label'>Confirm Bookin</span>
              </Link>
            </li>
          )}
          {/* <li>
            <a href='#!'>
              <span className='circle'>1</span>
              <span className='label'>First step</span>
            </a>
          </li>
          <li className='active'>
            <Link className='href' to='/login'>
              <span className='circle'>1</span>
              <span className='label'>Sign In</span>
            </Link>
          </li>
          <li className='warning'>
            <a href='#!'>
              <span className='circle'>
                <i className='fas fa-exclamation'></i>
              </span>
              <span className='label'>Third step</span>
            </a>
          </li> */}
        </ul>
      </Col>
    </Row>
  )
}

export default Stepper
