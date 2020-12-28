import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS} from '../actions/actionTypes'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  user: null,
}

export default function(state=initialState, action){
  if (action.type === USER_LOADING){
    return {
      ...state,
      //isLoading: true,
    }
  }
  if (action.type === USER_LOADED){
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      user: action.payload,
    }
  }
  if (action.type === LOGIN_SUCCESS || action.type === REGISTER_SUCCESS){
    localStorage.setItem('token', action.payload.token)
    return {
      ...state,
      ...action.payload,
      isLoading: false,
      isAuthenticated: true,
    }
  }
  if (action.type === AUTH_ERROR || action.type === LOGIN_FAIL || action.type === LOGOUT_SUCCESS || action.type === REGISTER_FAIL){
    localStorage.removeItem('token')
    return {
      ...state,
      isLoading: false,
      isAuthenticated: false,
      token: null,
      user: null,
    }
  }
  else{
    return state
  }
}  