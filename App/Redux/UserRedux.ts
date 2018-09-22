import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['userData'],
  registerSuccess: ['userData'],
  clearLogin: [],
  setProfileId: ['id']
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  authUser: null,
  login: null,
  profileUserId: null
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

export const setProfileId = (state, action) => {
  const { id } = action;
  return state.merge({ profileUserId: id });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.CLEAR_LOGIN]: clearLogin,
  [Types.SET_PROFILE_ID]: setProfileId
});