import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUser: ['userData'],
  registerSuccess: ['userData'],
  updateUser: ['userData'],
  addUserEducations: ['educations'],
  addUserExperiences: ['jobs'],
  removeUserEducations: ['educations'],
  editUserEducations: ['educations'],
  removeUserExperiences: ['jobs'],
  editUserExperiences: ['jobs'],
  updateGeneralSettings: ['settings']
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  authUser: null
});

export const setUser = (state, action) => {
  const userData = { 
    ...action.userData, 
    educations: action.userData.educations.map((e) => ({...e, id: e._id})),
    jobs: action.userData.jobs.map((j) => ({...j, id: j._id}))
  };
  return state.merge({ authUser: userData });
};

export const updateUser = (state, action) => {
  const { userData } = action;
  return state.merge({ authUser: userData });
};

export const addUserEducations = (state, action) => {
  const { educations } = action;
  return state.updateIn(['authUser', 'educations'], educationsList => educationsList.concat(educations));
};

export const addUserExperiences = (state, action) => {
  const { jobs } = action;
  return state.updateIn(['authUser', 'jobs'], jobsList => jobsList.concat(jobs));
};

export const removeUserEducations = (state, action) => {
  const { educations } = action;
  const ids = educations.map(e => e.id);
  return state.updateIn(
    ['authUser', 'educations'], 
    educationsList => educationsList.filter(
      e => !(ids.includes(e.id))
    )
  );
};

export const removeUserExperiences = (state, action) => {
  const { jobs } = action;
  const ids = jobs.map(e => e.id);
  return state.updateIn(
    ['authUser', 'jobs'], 
    jobsList => jobsList.filter(
      e => !(ids.includes(e.id))
    )
  );
};

export const editUserEducations = (state, action) => {
  const { educations } = action;
  const ids = educations.map(e => e.id);
  return state.updateIn(
    ['authUser', 'educations'], 
    educationsList => educationsList.map(function(e) {
      const id = e.id;
      if (ids.includes(id)) {
        return educations.filter(e => e.id == id)[0];
      } else {
        return e;
      }
    })
  );
};

export const editUserExperiences = (state, action) => {
  const { jobs } = action;
  const ids = jobs.map(e => e.id);
  return state.updateIn(
    ['authUser', 'jobs'], 
    jobsList => jobsList.map(function(e) {
      const id = e.id;
      if (ids.includes(id)) {
        return jobs.filter(e => e.id == id)[0];
      } else {
        return e;
      }
    })
  );
};

export const updateGeneralSettings = (state, action) => {
  const { settings } = action;
  return state.merge({authUser: settings}, {deep: true});
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
  [Types.UPDATE_USER]: updateUser,
  [Types.ADD_USER_EDUCATIONS]: addUserEducations,
  [Types.ADD_USER_EXPERIENCES]: addUserExperiences,
  [Types.REMOVE_USER_EDUCATIONS]: removeUserEducations,
  [Types.EDIT_USER_EDUCATIONS]: editUserEducations,
  [Types.REMOVE_USER_EXPERIENCES]: removeUserExperiences,
  [Types.EDIT_USER_EXPERIENCES]: editUserExperiences,
  [Types.UPDATE_GENERAL_SETTINGS]: updateGeneralSettings
});