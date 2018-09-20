import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['userData'],
  registerSuccess: ['userData'],
  clearLogin: []
});

export const logOut = (callback) => {
  return dispatch => {
    dispatch(Creators.clearLogin());
    callback();
  };
}

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  authUser: null,
  login: null
});

export const registerSuccess = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData, login: userData.email });
};

export const loginSuccess = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData, login: userData.email });
};

export const clearLogin = (state, action) => {
  return state.merge({ login: '' });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.CLEAR_LOGIN]: clearLogin
});