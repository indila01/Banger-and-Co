import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBookings } from '../actions/bookingAction'

const BookingListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bookingList = useSelector((state) => state.bookingList)
  const { loading, error, bookings } = bookingList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBookings())
    } else history.push('/login')
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Bookings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>VEHICLE</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>VERIFIED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id.substring(5, 10)}</td>
                  <td>
                    {booking.user &&
                      booking.user.firstName + ' ' + booking.user.lastName}
                  </td>
                  <td>{booking.vehicle && booking.vehicle.name}</td>
                  <td>{booking.createdAt.substring(0, 10)}</td>
                  <td>${booking.totalPrice}</td>
                  <td>
                    {booking.isPaid ? (
                      booking.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {booking.isVerified ? (
                      booking.verifiedAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer to={`/admin/booking/${booking._id}`}>
                      <Button variant='success' className='btn-sm'>
                        View Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* eslint-disable-next-line */}
          {bookings == 0 && <Message>Bookings are not available </Message>}
        </>
      )}
    </>
  )
}

export default BookingListScreen
