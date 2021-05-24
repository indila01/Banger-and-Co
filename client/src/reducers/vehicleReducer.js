import {
  VEHICLE_DETAILS_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_LIST_FAIL,
  VEHICLE_LIST_REQUEST,
  VEHICLE_LIST_SUCCESS,
} from '../constants/vehicleConstants'

export const vehicleListReducer = (state = { vehicles: [] }, action) => {
  switch (action.type) {
    case VEHICLE_LIST_REQUEST:
      return { loading: true, vehicles: [] }
    case VEHICLE_LIST_SUCCESS:
      return { loading: false, vehicles: action.payload }
    case VEHICLE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vehicleDetailstReducer = (
  state = { vehicle: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VEHICLE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case VEHICLE_DETAILS_SUCCESS:
      return { loading: false, vehicle: action.payload }
    case VEHICLE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
