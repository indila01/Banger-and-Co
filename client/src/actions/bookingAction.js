import {
  BOOKING_SAVE_DRIVER_DETAILS,
  BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_SAVE_VEHICLE_DETAILS,
} from '../constants/bookingConstants'

export const saveDriverDetails = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_DRIVER_DETAILS,
    payload: data,
  })

  localStorage.setItem('driverDetails', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveVehicleDetails = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_VEHICLE_DETAILS,
    payload: data,
  })

  localStorage.setItem('vehicleDetails', JSON.stringify(data))
}
