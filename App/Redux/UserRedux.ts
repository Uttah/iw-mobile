import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['userData'],
  registerSuccess: ['userData'],
  clearLogin: [],
  updateUser: ['userData'],
  addUserEducations: ['educations']
});

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

export const updateUser = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData });
};

export const addUserEducations = (state, action) => {
  const { educations } = action;
  return state.updateIn(['authUser', 'educations'], educationsList => educationsList.concat(educations));
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.CLEAR_LOGIN]: clearLogin,
  [Types.UPDATE_USER]: updateUser,
  [Types.ADD_USER_EDUCATIONS]: addUserEducations
});