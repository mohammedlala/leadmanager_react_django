import {ADD_LEAD, DELETE_LEAD, GET_LEADS} from '../actions/actionTypes'
import _ from 'lodash'

const initialState = {
  leads: [],
  loading: true,
}

export default (state = initialState, action) => {
  if(action.type === GET_LEADS){
    return {
      ...state,
      leads: action.payload,
      loading: false
    }
  }
  else if(action.type === DELETE_LEAD){
    return {
      ...state,
      leads: state.leads.filter((lead) => lead.id !== action.payload),
      loading: false
    }
  }
  else if (action.type === ADD_LEAD){
    return {
      ...state,
      leads: [...state.leads, action.payload],
      loading: false
    }
  }
  else{
    return state
  }
}