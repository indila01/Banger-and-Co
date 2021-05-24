import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  vehicleDetailstReducer,
  vehicleListReducer,
} from './reducers/vehicleReducer'

const reducer = combineReducers({
  vehicleList: vehicleListReducer,
  vehicleDetails: vehicleDetailstReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
