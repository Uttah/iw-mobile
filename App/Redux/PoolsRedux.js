import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import api from '../Services/MyApi';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	beforeLoad: [],
	setPools: ['data'],
	setPoolsLoadErr: ['err']
});

export const loadPoolsAsync = () => {
	return dispatch => {
		dispatch(Creators.beforeLoad());
		api.getPools()
			.then((data) => {
				dispatch(Creators.setPools(data));
			})
			.catch((err) => dispatch(setPoolsLoadErr(err)));
	}
}

export const INITIAL_STATE = Immutable({
  fetching: false,
  popular: [],
	created: [],
	invested: [],
	filtered: [],
	err: ''
});

export const beforeLoad = (state, action) => {
	return state.merge({ fetching: true });
};

export const setPools = (state, action) => {
	const { popular, created, invested } = action.data;
	return state.merge({ 
		popular: popular, 
		created: created, 
		invested: invested,
		fetching: false
	});
};

export const setPoolsLoadErr = (state, action) => {
	return state.merge({ err: action.err, fetching: false });
}

export const reducer = createReducer(INITIAL_STATE, {
	[Types.BEFORE_LOAD]: beforeLoad,
	[Types.SET_POOLS]: setPools,
	[Types.SET_POOLS_LOAD_ERR]: setPoolsLoadErr
});