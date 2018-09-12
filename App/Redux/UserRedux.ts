import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['userData'],
  registerSuccess: ['userData']
})

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  authUser: null
});

export const registerSuccess = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData });
};

export const loginSuccess = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess
});