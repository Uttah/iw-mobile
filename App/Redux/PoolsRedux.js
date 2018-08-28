import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import api from '../../Services/MyApi';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	beforeLoad: [],
	loadItems: []
})

export const PoolsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  popular: [],
	created: [],
	invested: [],
	filtered: [],
	filterStr: '',
	error: ''
});

export const beforeLoad = (state, action) => {
	return state.merge({ fetching: true });
};

export const loadItems = (state, action) => {

};

// export const registerSuccess = (state, action) => {
//   const { name } = action;
//   return state.merge({ name });
// };

// export const loginSuccess = (state, action) => {
//   const { name } = action;
//   return state.merge({ name });
// };

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.REGISTER_SUCCESS]: registerSuccess,
  // [Types.LOGIN_SUCCESS]: loginSuccess
});