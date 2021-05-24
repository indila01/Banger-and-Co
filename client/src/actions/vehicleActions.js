import {
  VEHICLE_DETAILS_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_LIST_FAIL,
  VEHICLE_LIST_REQUEST,
  VEHICLE_LIST_SUCCESS,
} from '../constants/vehicleConstants'
import axios from 'axios'

export const listVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_LIST_REQUEST })

    const { data } = await axios.get('/api/vehicles')

    dispatch({
      type: VEHICLE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VEHICLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVehicleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/vehicles/${id}`)

    dispatch({
      type: VEHICLE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VEHICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
