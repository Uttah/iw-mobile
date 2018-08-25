import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['name'],
  registerSuccess: ['name']
})

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  login: null,
  password: null,
  name: null
});

export const registerSuccess = (state, action) => {
  const { name } = action;
  return state.merge({ name });
};

export const loginSuccess = (state, action) => {
  const { name } = action;
  return state.merge({ name });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess
});