import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addJob: ['job'],
  addEducation: ['education'],
  setJobs: ['jobs'],
  setEducations: ['educations'],
	addUserEducations: ['educations'],
	reset: []
});

export const EditUserTypes = Types;
export default Creators;

export const INITIAL_STATE = {
	jobsAdded: [],
	educationsAdded: [],
	jobs: [],
	educations: []
};

export const setEducations = (state, action) => {
	const { educations } = action;
	return {
		...state,
		educations: educations
	}
};

export const addEducation = (state, action) => {
	const { education } = action;
	return {
		...state,
		educationsAdded: state.educationsAdded.concat([education])
	}
};

export const setJobs = (state, action) => {
	const { jobs } = action;
	return {
		...state,
		jobs: jobs
	}
};

export const addJob = (state, action) => {
	const { job } = action;
	return {
		...state,
		jobsAdded: state.jobsAdded.concat([job])
	}
};

export const reset = (state, action) => {
	return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_JOB]: addJob,
  [Types.ADD_EDUCATION]: addEducation,
  [Types.SET_JOBS]: setJobs,
	[Types.SET_EDUCATIONS]: setEducations,
	[Types.RESET]: reset
});