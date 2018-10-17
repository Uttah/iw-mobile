import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLogin: ['login'],
  clearLogin: []
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  login: null
});

export const setLogin = (state, action) => {
  const { login } = action;
  return state.merge({ login });
};

export const clearLogin = (state, action) => {
  return state.merge({ login: '' });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGIN]: setLogin,
  [Types.CLEAR_LOGIN]: clearLogin
});