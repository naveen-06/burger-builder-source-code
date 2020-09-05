import * as actionType from './userActionTypes';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null
};

const userReducer = ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case actionType.GET_CURRENT_USER_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionType.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      }
    case actionType.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
};

export default userReducer;