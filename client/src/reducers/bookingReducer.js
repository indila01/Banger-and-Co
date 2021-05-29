import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_SAVE_DRIVER_DETAILS,
  BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_SAVE_VEHICLE_DETAILS,
} from '../constants/bookingConstants'

export const bookingReduer = (state = { driverDetails: {} }, action) => {
  switch (action.type) {
    case BOOKING_SAVE_DRIVER_DETAILS:
      return {
        ...state,
        driverDetails: action.payload,
      }
    case BOOKING_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case BOOKING_SAVE_VEHICLE_DETAILS:
      return {
        ...state,
        vehicleDetails: action.payload,
      }
    default:
      return state
  }
}

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        booking: action.payload,
      }
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
