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
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import VehicleListScreen from './screens/VehicleListScreen'
import VehicleEditScreen from './screens/VehicleEditScreen'
import BookingListScreen from './screens/BookingListScreen'

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
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/vehiclelist' component={VehicleListScreen} />
          <Route path='/admin/vehicle/:id/edit' component={VehicleEditScreen} />
          <Route path='/admin/bookinglist' component={BookingListScreen} />
          <Route path='/admin/booking/:id' component={BookingScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
