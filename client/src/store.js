import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  vehicleCreateReducer,
  vehicleDeleteReducer,
  vehicleDetailstReducer,
  vehicleListReducer,
  vehicleReviewCreateReducer,
  vehicleTopRatedReducer,
  vehicleUpdateReducer,
} from './reducers/vehicleReducer'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducer'
import {
  bookingReduer,
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingListMyReducer,
  bookingListReducer,
  bookingVerifyReducer,
} from './reducers/bookingReducer'
import { equipmentListReducer } from './reducers/equipmentReducer'

const reducer = combineReducers({
  equipmentList: equipmentListReducer,
  vehicleList: vehicleListReducer,
  vehicleDetails: vehicleDetailstReducer,
  vehicleDelete: vehicleDeleteReducer,
  vehicleCreate: vehicleCreateReducer,
  vehicleUpdate: vehicleUpdateReducer,
  vehicleReviewCreate: vehicleReviewCreateReducer,
  vehicleTopRated: vehicleTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookingDetails: bookingReduer,
  bookingCreate: bookingCreateReducer,
  bookingDetailsById: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingVerify: bookingVerifyReducer,
  bookingListMy: bookingListMyReducer,
  bookingList: bookingListReducer,
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
const bookingDetailsFromStorage = localStorage.getItem('bookingDetails')
  ? JSON.parse(localStorage.getItem('bookingDetails'))
  : {}

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  bookingDetails: {
    driverDetails: driverDetailsFromStorage,
    vehicleDetails: vehicleDetailsFromStorage,
    bookingDetails: bookingDetailsFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
