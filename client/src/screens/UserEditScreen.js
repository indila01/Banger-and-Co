import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [NIC, setNIC] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [birthday, setBirthday] = useState()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isBlacklisted, setIsBlacklisted] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.firstName || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setAddress(user.address)
        setNIC(user.NIC)
        setLicenseNumber(user.licenseNumber)
        setContactNumber(user.contactNumber)
        setBirthday(user.birthday)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsBlacklisted(user.isBlacklisted)
        setIsVerified(user.isVerified)
      }
    }
  }, [user, dispatch, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        firstName,
        lastName,
        contactNumber,
        NIC,
        licenseNumber,
        address,
        email,
        isAdmin,
        isVerified,
        isBlacklisted,
      })
    )
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn  btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group controlId='firstname'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='lastname'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='contact'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type='tel'
                placeholder='Enter contact number'
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId='license'>
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter license number'
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='nic'>
                  <Form.Label>NIC</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter NIC'
                    value={NIC}
                    onChange={(e) => setNIC(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='birthday'>
                  <Form.Label>Date of birth </Form.Label>
                  <Form.Control
                    type='text'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='mt-2'>
              <Col>
                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='isverified'>
                  <Form.Check
                    type='checkbox'
                    label='Verify'
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='isblacklisted'>
                  <Form.Check
                    type='checkbox'
                    label='Blacklist'
                    checked={isBlacklisted}
                    onChange={(e) => setIsBlacklisted(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
            </Row>
            <Button
              type='submit'
              variant='success'
              className='my-3'
              style={{ width: '100%' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
