import { createReducer, createActions } from 'reduxsauce';
import uuid from 'uuid/v1';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setExperiences: ['jobs'],
  setEducations: ['educations'],
	addEducation: ['education'],
	addExperience: ['job'],
	editEducation: ['education'],
	editExperience: ['job'],
	deleteEducation: ['id'],
	deleteExperience: ['id'],
	reset: [],
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
		educations: educations.map(function(e) {
			return { ...e, deleted: false, edited: false }
		})
	}
};

export const setExperiences = (state, action) => {
	const { jobs } = action;
	return {
		...state,
		jobs: jobs.map(function(e) {
			return { ...e, deleted: false, edited: false }
		})
	}
};

export const addEducation = (state, action) => {
	const { education } = action;
	return {
		...state,
		educationsAdded: state.educationsAdded.concat([{ ...education, id: uuid() }])
	}
};

export const addExperience = (state, action) => {
	const { job } = action;
	return {
		...state,
		jobsAdded: state.jobsAdded.concat([{ ...job, id: uuid() }])
	}
};

export const editEducation = (state, action) => {
	const { education } = action;

	return {
		...state,
		educationsAdded: state.educationsAdded.map(function(e) {
			if (e.id != education.id) {
				return e;
			} else {
				return {
					...education,
					edited: true,
					deleted: false,
				};
			}
		}),
		educations: state.educations.map(function(e) {
			if (e.id != education.id) {
				return e;
			} else {
				return {
					...education,
					edited: true,
					deleted: false,
				};
			}
		})
	}
};

export const editExperience = (state, action) => {
	const { job } = action;

	return {
		...state,
		jobsAdded: state.jobsAdded.map(function(e) {
			if (e.id != job.id) {
				return e;
			} else {
				return {
					...job,
					edited: true,
					deleted: false,
				};
			}
		}),
		jobs: state.jobs.map(function(e) {
			if (e.id != job.id) {
				return e;
			} else {
				return {
					...job,
					edited: true,
					deleted: false,
				};
			}
		})
	}
};

export const deleteEducation = (state, action) => {
	const { id } = action;

	return {
		...state,
		educationsAdded: state.educationsAdded.map(function(e) {
			return { ...e, deleted: e.id == id ? true : e.deleted }
		}),
		educations: state.educations.map(function(e) {
			return { ...e, deleted: e.id == id ? true : e.deleted }
		})
	}
};

export const deleteExperience = (state, action) => {
	const { id } = action;
	return {
		...state,
		jobsAdded: state.jobsAdded.map(function(e) {
			return { ...e, deleted: e.id == id ? true : e.deleted }
		}),
		jobs: state.jobs.map(function(e) {
			return { ...e, deleted: e.id == id ? true : e.deleted }
		})
	}
};

export const reset = (state, action) => {
	return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_EXPERIENCES]: setExperiences,
	[Types.SET_EDUCATIONS]: setEducations,
  [Types.ADD_EXPERIENCE]: addExperience,
  [Types.ADD_EDUCATION]: addEducation,
	[Types.EDIT_EDUCATION]: editEducation,
	[Types.EDIT_EXPERIENCE]: editExperience,
	[Types.DELETE_EDUCATION]: deleteEducation,
	[Types.DELETE_EXPERIENCE]: deleteExperience,
	[Types.RESET]: reset
});