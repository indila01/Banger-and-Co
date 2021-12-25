import {
  EQUIPMENT_LIST_FAIL,
  EQUIPMENT_LIST_SUCCESS,
  EQUIPMENT_LIST_REQUEST,
} from '../constants/equipmentConstants.js'

export const equipmentListReducer = (state = { equipments: [] }, action) => {
  switch (action.type) {
    case EQUIPMENT_LIST_REQUEST:
      return { loading: true, equipments: [] }
    case EQUIPMENT_LIST_SUCCESS:
      return {
        loading: false,
        equipments: action.payload,
      }
    case EQUIPMENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
