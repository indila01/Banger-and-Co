import {
  VEHICLE_COMPARE_FAIL,
  VEHICLE_COMPARE_REQUEST,
  VEHICLE_COMPARE_SUCCESS,
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_REQUEST,
  VEHICLE_CREATE_RESET,
  VEHICLE_CREATE_REVIEW_FAIL,
  VEHICLE_CREATE_REVIEW_REQUEST,
  VEHICLE_CREATE_REVIEW_RESET,
  VEHICLE_CREATE_REVIEW_SUCCESS,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DELETE_REQUEST,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_DETAILS_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_LIST_FAIL,
  VEHICLE_LIST_REQUEST,
  VEHICLE_LIST_SUCCESS,
  VEHICLE_TOP_FAIL,
  VEHICLE_TOP_REQUEST,
  VEHICLE_TOP_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  VEHICLE_UPDATE_REQUEST,
  VEHICLE_UPDATE_RESET,
  VEHICLE_UPDATE_SUCCESS,
} from '../constants/vehicleConstants'

export const vehicleListReducer = (state = { vehicles: [] }, action) => {
  switch (action.type) {
    case VEHICLE_LIST_REQUEST:
      return { loading: true, vehicles: [] }
    case VEHICLE_LIST_SUCCESS:
      return {
        loading: false,
        vehicles: action.payload.vehicles,
        pages: action.payload.pages,
        page: action.payload.page,
      }
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

export const vehicleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_DELETE_REQUEST:
      return { loading: true }
    case VEHICLE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case VEHICLE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vehicleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_CREATE_REQUEST:
      return { loading: true }
    case VEHICLE_CREATE_SUCCESS:
      return { loading: false, success: true, vehicle: action.payload }
    case VEHICLE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case VEHICLE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const vehicleUpdateReducer = (state = { vehicle: {} }, action) => {
  switch (action.type) {
    case VEHICLE_UPDATE_REQUEST:
      return { loading: true }
    case VEHICLE_UPDATE_SUCCESS:
      return { loading: false, success: true, vehicle: action.payload }
    case VEHICLE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case VEHICLE_UPDATE_RESET:
      return { vehicle: {} }
    default:
      return state
  }
}

export const vehicleReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case VEHICLE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case VEHICLE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case VEHICLE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const vehicleTopRatedReducer = (state = { vehicles: [] }, action) => {
  switch (action.type) {
    case VEHICLE_TOP_REQUEST:
      return { loading: true, vehicles: [] }
    case VEHICLE_TOP_SUCCESS:
      return { loading: false, vehicles: action.payload }
    case VEHICLE_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const vehicleCompareReducer = (state = { compare: {} }, action) => {
  switch (action.type) {
    case VEHICLE_COMPARE_REQUEST:
      return { loading: true }
    case VEHICLE_COMPARE_SUCCESS:
      return { loading: false, success: true, compare: action.payload }
    case VEHICLE_COMPARE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
