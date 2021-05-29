import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import VehicleScreen from './screens/VehicleScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import ConfirmBookingScreen from './screens/ConfirmBookingScreen'
import DriverDetailsScreen from './screens/DriverDetailsScreen'
import BookingScreen from './screens/BookingScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/vehicle/:id' component={VehicleScreen} />
          <Route path='/booking/:id' component={BookingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/driverDetails' component={DriverDetailsScreen} />
          <Route path='/confirmBooking' component={ConfirmBookingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
