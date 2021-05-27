import { BOOKING_SAVE_DRIVER_DETAILS } from '../constants/bookingConstants'

export const saveDriverDetails = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_DRIVER_DETAILS,
    payload: data,
  })

  localStorage.setItem('driverDetails', JSON.stringify(data))
}
