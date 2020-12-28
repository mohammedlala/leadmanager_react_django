import axios from 'axios'
import {DELETE_LEAD, GET_LEADS, ADD_LEAD, GET_ERRORS} from './actionTypes'
import { createMessage, returnError } from './messages'
import { tokenConfig } from "./auth";

export const getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/leads/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      })
    })  
  .catch((err) => dispatch(returnError(err.response.data, err.response.status)))
}

export const deleteLead = id => {
  return(dispatch, getState) => {
    axios
      .delete(`/api/leads/${id}/`, tokenConfig(getState))
      .then(res => {
        dispatch(createMessage({ deleteLead: 'Lead Deleted!!' }))
        dispatch({
          type: DELETE_LEAD,
          payload: id 
        })
      })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })  
  }
}
export const addLead = lead => (dispatch, getState) => {
  axios
    .post(`/api/leads/`, lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addLead: `${lead.name} Added!!` }))
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      })
    })
  .catch((err) => dispatch(returnError(err.response.data, err.response.status)))  
}