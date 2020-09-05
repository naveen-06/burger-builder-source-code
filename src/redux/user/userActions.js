import { auth } from '../../firebase.utils/firebase.utils';
import * as actionType from './userActionTypes';

export const getCurrentUserStart = () => ({
  type: actionType.GET_CURRENT_USER_START
});

export const getCurrentUserSuccess = currentUser => ({
  type: actionType.GET_CURRENT_USER,
  payload: currentUser
});

export const getCurrentUserFailure = error => ({
  type: actionType.GET_CURRENT_USER_FAILURE,
  payload: error
});

export const getCurrentUser = () => {
  return dispatch => {
    dispatch( getCurrentUserStart() );
    auth.onAuthStateChanged( user => {

      if (user) {
        const { email, uid } = user;
        const currentUser = {
          email,
          uid
        };

        return (
          dispatch( getCurrentUserSuccess(currentUser) )
        );
      }
    })
  };
};