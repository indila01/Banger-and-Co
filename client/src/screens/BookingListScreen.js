import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBookings } from '../actions/bookingAction'
import { MDBDataTable } from 'mdbreact'

const BookingListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bookingList = useSelector((state) => state.bookingList)
  const { loading, error, bookings } = bookingList

  const tableData = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'ace',
        width: 150,
      },
      { label: 'USER', field: 'user', sort: 'ace', width: 150 },
      { label: 'VEHICLE', field: 'vehicle', sort: 'ace', width: 150 },
      { label: 'DATE', field: 'date', sort: 'ace', width: 150 },
      { label: 'TOTAL PRICE', field: 'total', sort: 'ace', width: 150 },
      { label: 'PAID', field: 'paid', sort: 'ace', width: 150 },
      { label: 'VERIFIED', field: 'verified', sort: 'ace', width: 150 },
      {
        label: 'ACTION',
        field: 'action',
        sort: 'ace',
        width: 150,
      },
    ],
    rows: [],
  }

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
          <MDBDataTable
            striped
            bordered
            small
            data={{
              ...tableData,
              rows: [
                ...bookings.map((booking) => ({
                  id: booking._id.substring(5, 10),
                  user: `${
                    booking.user &&
                    booking.user.firstName + ' ' + booking.user.lastName
                  }`,
                  vehicle: `${booking.vehicle && booking.vehicle.name}`,
                  date: booking.createdAt.substring(0, 10),
                  total: `$${booking.totalPrice}`,
                  paid: booking.isPaid ? (
                    booking.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),
                  verified: booking.isVerified ? (
                    booking.verifiedAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),
                  action: (
                    <div className='d-flex justify-content-center'>
                      <LinkContainer to={`/admin/booking/${booking._id}`}>
                        <Button variant='success' className='btn-sm'>
                          View Details
                        </Button>
                      </LinkContainer>
                    </div>
                  ),
                })),
              ],
            }}
          />

          {/* eslint-disable-next-line */}
          {bookings == 0 && <Message>Bookings are not available </Message>}
        </>
      )}
    </>
  )
}

export default BookingListScreen
