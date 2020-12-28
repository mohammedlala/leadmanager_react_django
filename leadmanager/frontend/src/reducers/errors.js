import { GET_ERRORS } from '../actions/actionTypes'

const initialState = {
  msg: {},
  status: null,
}

export default function(state = initialState, action){
  if (action.type === GET_ERRORS){
    return {
      msg: action.payload.msg,
      status: action.payload.status
    }
  }
  
  else{
    return state
  }
}