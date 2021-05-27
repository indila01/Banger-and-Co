import { BOOKING_SAVE_DRIVER_DETAILS } from '../constants/bookingConstants'

export const bookingReduer = (state = { driverDetails: {} }, action) => {
  switch (action.type) {
    case BOOKING_SAVE_DRIVER_DETAILS:
      return {
        ...state,
        driverDetails: action.payload,
      }
    default:
      return state
  }
}
