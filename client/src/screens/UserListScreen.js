import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { MDBDataTable } from 'mdbreact'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const [tableData, setTableData] = useState({
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'ace',
        width: 150,
      },
      { label: 'NAME', field: 'name', sort: 'ace', width: 150 },
      { label: 'NIC', field: 'nic', sort: 'ace', width: 150 },
      { label: 'EMAIL', field: 'email', sort: 'ace', width: 150 },
      { label: 'VERIFIED', field: 'verified', sort: 'ace', width: 150 },
      { label: 'BLACLISTED', field: 'blacklisted', sort: 'ace', width: 150 },
      { label: 'ADMIN', field: 'admin', sort: 'ace', width: 150 },
      {
        label: 'ACTION',
        field: 'action',
        sort: 'ace',
        width: 150,
      },
    ],
    rows: [],
  })
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
      // if (users) {
      // setTableData({
      //   ...tableData,
      //   rows: [
      //     ...users.map((user) => ({
      //       id: user._id.substring(19, 24),
      //       name: `${user.firstName} ${user.lastName}`,
      //       email: user.email,
      //       nic: user.NIC,
      //       verified: user.isVerified ? (
      //         ({ verified: true },
      //         (<i className='fas fa-check' style={{ color: 'green' }}></i>))
      //       ) : (
      //         <i className='fas fa-times' style={{ color: 'red' }}></i>
      //       ),
      //       blacklisted: user.isBlacklisted ? (
      //         <i className='fas fa-check' style={{ color: 'green' }}></i>
      //       ) : (
      //         <i className='fas fa-times' style={{ color: 'red' }}></i>
      //       ),
      //       admin: user.isAdmin ? (
      //         <i className='fas fa-check' style={{ color: 'green' }}></i>
      //       ) : (
      //         <i className='fas fa-times' style={{ color: 'red' }}></i>
      //       ),
      //       action: (
      //         <>
      //           <LinkContainer to={`/admin/user/${user._id}/edit`}>
      //             <Button variant='light' className='btn-sm'>
      //               <i className='fas fa-edit'></i>
      //             </Button>
      //           </LinkContainer>
      //           <Button
      //             variant='danger'
      //             className='btn-sm'
      //             onClick={() => deleteHandler(user._id)}
      //           >
      //             <i className='fas fa-trash'></i>
      //           </Button>
      //         </>
      //       ),
      //     })),
      //   ],
      // })
      // }
    } else history.push('/login')
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
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
                ...users.map((user) => ({
                  id: user._id.substring(19, 24),
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                  nic: user.NIC,
                  verified: user.isVerified ? (
                    ({ verified: true },
                    (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ))
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),
                  blacklisted: user.isBlacklisted ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),
                  admin: user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),
                  action: (
                    <>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </>
                  ),
                })),
              ],
            }}
          />
          {/* eslint-disable-next-line */}
          {users == 0 && <Message>Users are not available </Message>}
        </>
      )}
    </>
  )
}

export default UserListScreen
