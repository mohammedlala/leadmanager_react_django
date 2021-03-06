import axios from 'axios'
import { createMessage, returnError } from "./messages";
import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/actionTypes'

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = (username, password) => dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const body = JSON.stringify({username, password});

  axios.post('/api/auth/login',body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    }).catch(err => {
      dispatch(
        returnError(
          err.response.data, 
          err.response.status
        )
      )
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

export const register = ({username, email, password}) => dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const body = JSON.stringify({username, password, email});

  axios.post('/api/auth/register',body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    }).catch(err => {
      dispatch(
        returnError(
          err.response.data, 
          err.response.status
        )
      )
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

export const logout = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ loggedOut: 'You are Logged Out!!' }))
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};