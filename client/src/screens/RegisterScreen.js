import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { Calendar } from 'react-date-range'
import FileUpload from '../components/file-upload/file-upload.component'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import axios from 'axios'

const RegisterScreen = ({ location, history }) => {
  const [dob, setDob] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [NIC, setNIC] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [newUserInfo, setNewUserInfo] = useState({
    documents: [],
    documentsUrl: [],
  })

  const updateUploadedFiles = (files) => {
    setNewUserInfo({ ...newUserInfo, documents: files })
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const userRegister = useSelector((state) => state.userRegister)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userLogin.userInfo) {
      history.push(redirect)
    }
  }, [history, userLogin.userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    const today = new Date()
    const birthday = new Date(dob)
    var age_now = today.getFullYear() - birthday.getFullYear()
    const m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age_now--
    }
    if (age_now < 18) {
      setMessage('Youre below 18, you must be above 18 to register.')
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // eslint-disable-next-line 
      if (newUserInfo.documents == 0) {
        setMessage('Upload documents to register')
      } else {
        const urls = []
        // eslint-disable-next-line 
        newUserInfo.documents.map((file) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', 'o3aaulge')
          formData.append('folder', `${email}/`)
          formData.append('api_key', '827283169955268')

          axios
            .post(
              'https://api.cloudinary.com/v1_1/dn0cobibi/image/upload',
              formData
            )
            .then((response) => {
              const data = response.data
              urls.push(data.secure_url)
            })
        })
        setNewUserInfo({ ...newUserInfo, documentsUrl: urls })
        dispatch(
          register(
            firstName,
            lastName,
            contactNumber,
            address,
            NIC,
            licenseNumber,
            email,
            password,
            birthday,
            newUserInfo
          )
        )
      }
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {userRegister.error && (
        <Message variant='danger'>{userRegister.error}</Message>
      )}
      {userRegister.loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                required
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='name'
                required
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                required
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='contactNo'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type='tel'
                required
                placeholder='Enter contact number'
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            required
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId='NIC'>
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type='name'
                required
                placeholder='NIC'
                value={NIC}
                onChange={(e) => setNIC(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='lincenseNumber'>
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type='name'
                required
                placeholder='License Number'
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <Form.Group controlId='birthday'>
            <Form.Label>Date of birth </Form.Label>
            <Calendar
              maxDate={new Date()}
              color='#2fb380'
              className='form-control'
              onChange={(item) => setDob(item)}
              date={dob}
              months={2}
              direction='horizontal'
            />
          </Form.Group>
        </Col>
        <Col>
          <FileUpload
            accept='.jpg,.png,.jpeg,.pdf'
            label='Documents'
            multiple
            updateFilesCb={updateUploadedFiles}
          />
        </Col>

        <Row>
          <Col>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                required
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                required
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button
          type='submit'
          variant='primary'
          className='my-3 mx-auto'
          style={{ width: '100%' }}
        >
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
