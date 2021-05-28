import {
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
        paymentMehod: action.payload,
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
