import {
  EQUIPMENT_LIST_FAIL,
  EQUIPMENT_LIST_REQUEST,
  EQUIPMENT_LIST_SUCCESS,
} from '../constants/equipmentConstants'
import axios from 'axios'

export const listEquipments = () => async (dispatch) => {
  try {
    dispatch({
      type: EQUIPMENT_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/equipments/`)

    dispatch({
      type: EQUIPMENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EQUIPMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
