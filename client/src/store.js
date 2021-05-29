import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  vehicleDetailstReducer,
  vehicleListReducer,
} from './reducers/vehicleReducer'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer'
import {
  bookingReduer,
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingListMyReducer,
} from './reducers/bookingReducer'

const reducer = combineReducers({
  vehicleList: vehicleListReducer,
  vehicleDetails: vehicleDetailstReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  bookingDetails: bookingReduer,
  bookingCreate: bookingCreateReducer,
  bookingDetailsById: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingListMy: bookingListMyReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const driverDetailsFromStorage = localStorage.getItem('driverDetails')
  ? JSON.parse(localStorage.getItem('driverDetails'))
  : {}

const vehicleDetailsFromStorage = localStorage.getItem('vehicleDetails')
  ? JSON.parse(localStorage.getItem('vehicleDetails'))
  : {}

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  bookingDetails: {
    driverDetails: driverDetailsFromStorage,
    vehicleDetails: vehicleDetailsFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
