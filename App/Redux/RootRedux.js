import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	showCommentsModal: [],
  hideCommentsModal: []
});

export const RootTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  isCommentsModalVisible: false
});

export const showCommentsModal = (state, action) => {
  return state.merge({ isCommentsModalVisible: true });
};

export const hideCommentsModal = (state, action) => {
  return state.merge({ isCommentsModalVisible: false });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_COMMENTS_MODAL]: showCommentsModal,
  [Types.HIDE_COMMENTS_MODAL]: hideCommentsModal
});