import {
  BOOKING_SAVE_DRIVER_DETAILS,
  BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_SAVE_VEHICLE_DETAILS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_REQUEST,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_PAY_SUCCESS,
  BOOKING_PAY_FAIL,
  BOOKING_PAY_REQUEST,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_VERIFY_REQUEST,
  BOOKING_VERIFY_SUCCESS,
  BOOKING_VERIFY_FAIL,
} from '../constants/bookingConstants'
import axios from 'axios'

export const saveDriverDetails = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_DRIVER_DETAILS,
    payload: data,
  })

  localStorage.setItem('driverDetails', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveVehicleDetails = (data) => (dispatch) => {
  dispatch({
    type: BOOKING_SAVE_VEHICLE_DETAILS,
    payload: data,
  })

  localStorage.setItem('vehicleDetails', JSON.stringify(data))
}

export const createBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/bookings`, booking, config)

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getBookingDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/bookings/${id}`, config)

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payBooking =
  (bookingId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKING_PAY_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/bookings/${bookingId}/pay`,
        paymentResult,
        config
      )

      dispatch({
        type: BOOKING_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOKING_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const verifyBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_VERIFY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/bookings/${booking._id}/verify`,
      {},
      config
    )

    dispatch({
      type: BOOKING_VERIFY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/bookings/mybookings`, config)

    dispatch({
      type: BOOKING_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/bookings`, config)

    dispatch({
      type: BOOKING_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
