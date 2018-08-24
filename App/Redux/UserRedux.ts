import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['login', 'password'],
  loginSuccess: ['name']
})

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  login: null,
  password: null,
  name: null
});

export const loginRequest = (state, action) => {
  const { login, password } = action;
  return state.merge({ login, password });
};

export const loginSuccess = (state, action) => {
  const { name } = action;
  return state.merge({ name });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess
});