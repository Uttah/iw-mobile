import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import styles from './Styles/EditProfileScreenStyles';
import EditProfile from '../Components/EditProfile';
import { connect } from 'react-redux';
import {
	UPDATE_USER,
	ADD_JOB,
	REMOVE_JOB,
	REMOVE_EDUCATION,
	ADD_EDUCATION,
	UPDATE_JOB,
	UPDATE_EDUCATION
} from '../Services/Graphql';
import { withApollo } from 'react-apollo';
import UserActions from '../Redux/UserRedux';
import EditUserActions from '../Redux/EditUserRedux';

const guid = ()  =>{
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class EditProfileScreen extends Component<Props> {
	componentDidMount(){
		const { dispatch, authUser } = this.props;
		dispatch(EditUserActions.setExperiences(authUser.jobs));
		dispatch(EditUserActions.setEducations(authUser.educations));
	}

	onAddEducationPress = () => {
		this.props.navigation.navigate('AddEducationScreen');
	}

	onAddExperiencePress = () => {
		this.props.navigation.navigate('AddExperienceScreen');
	}

	onEducationEdit = (id) => {
		const { navigation, educations, educationsAdded } = this.props;
		const isAdded = educationsAdded.filter((e) => e.id == id).length > 0;
		let education:any;
		
		if (isAdded) {
			education = educationsAdded.filter(e => e.id == id)[0];
		} else {
			education = educations.filter(e => e.id == id)[0];
		}

		navigation.navigate('EditEducationScreen', { id, education });
	}

	onExperienceEdit = (id) => {
		const { navigation, jobs, jobsAdded } = this.props;
		const isAdded = jobsAdded.filter((e) => e.id == id).length > 0;
		let job:any;
		
		if (isAdded) {
			job = jobsAdded.filter(e => e.id == id)[0];
		} else {
			job = jobs.filter(e => e.id == id)[0];
		}

		navigation.navigate('EditExperienceScreen', { id, job });
	}

	onEducationDelete = (id) => {
		const { dispatch } = this.props;
		dispatch(EditUserActions.deleteEducation(id));
	}

	onExperienceDelete = (id) => {
		const { dispatch } = this.props;
		dispatch(EditUserActions.deleteExperience(id));
	}

	addEducation = async(id, education) => {
		const data = await this.props.client.mutate({
			mutation: ADD_EDUCATION,
			variables: { 
				userId: id,
				input: {
					name: education.name,
					from: education.from,
					to: education.to
				}
			}
		});
		return {
			...education,
			id: data.data.addEducation
		}
	}

	addEducations = async(id, educations) => {
		return Promise.all(educations.map((education) => this.addEducation(id, education)));
	}

	addExperience = async(id, job) => {
		const data = await this.props.client.mutate({
			mutation: ADD_JOB,
			variables: { 
				userId: id,
				input: {
					name: job.name,
					from: job.from,
					to: job.to
				}
			}
		});
		return {
			...job,
			id: data.data.addJob
		}
	}

	addExperiences = async(id, jobs) => {
		return Promise.all(jobs.map((job) => this.addExperience(id, job)));
	}

	removeEducation = async(id, education) => {
		const data = 	await this.props.client.mutate({
			mutation: REMOVE_EDUCATION,
			variables: {
				userId: id,
				id: education.id
			}
		});
		return {
			id: education.id,
			removed: data.data.removeEducation
		}
	}

	removeEducations = async(id, educations) => {
		return Promise.all(educations.map((education) => this.removeEducation(id, education)));
	}

	removeExperience = async(id, job) => {
		const data = 	await this.props.client.mutate({
			mutation: REMOVE_JOB,
			variables: {
				userId: id,
				id: job.id
			}
		});
		return {
			id: job.id,
			removed: data.data.removeJob
		}
	}

	removeExperiences = async(id, jobs) => {
		return Promise.all(jobs.map((job) => this.removeExperience(id, job)));
	}

	editEducation = async(id, education) => {
		const data = await this.props.client.mutate({
			mutation: UPDATE_EDUCATION,
			variables: {
				userId: id,
				id: education.id,
				input: {
					name: education.name,
					from: education.from,
					to: education.to
				}
			}
		});

		return {...education, updated: data.data.updateEducation};
	}

	editEducations = async(id, educations) => {
		return Promise.all(educations.map((education) => this.editEducation(id, education)));
	}

	editExperience = async(id, job) => {
		const data = await this.props.client.mutate({
			mutation: UPDATE_JOB,
			variables: {
				userId: id,
				id: job.id,
				input: {
					name: job.name,
					from: job.from,
					to: job.to
				}
			}
		});

		return {...job, updated: data.data.updateJob};
	}

	editExperiences = async(id, jobs) => {
		return Promise.all(jobs.map((job) => this.editExperience(id, job)));
	}

	handleSave = async(id, form) => {
		const { name, login, country, city, site, about, fb, linkedin, twitter } = form.values;
		const { dispatch, jobs, educations, jobsAdded, educationsAdded } = this.props;

		const userResult = await this.props.client.mutate({
			mutation: UPDATE_USER,
			variables: {input: {
				id: id,
				name: name,
				login: login,
				country: country,
				city: city,
				site: site,
				clinks: {
					fb: fb,
					linkedin: linkedin,
					twitter: twitter,
				},
				about: about
			}},
		});
		dispatch(UserActions.updateUser(userResult.data.updateUser));

		const educationsAddedResult = await this.addEducations(id, educationsAdded.filter(e => !e.deleted));
		dispatch(UserActions.addUserEducations(educationsAddedResult));

		const jobsAddedResult = await this.addExperiences(id, jobsAdded.filter(e => !e.deleted));
		dispatch(UserActions.addUserExperiences(jobsAddedResult));

		const educationsEditedResult = await this.editEducations(id, educations.filter(e => e.edited));
		dispatch(UserActions.editUserEducations(educationsEditedResult.filter(e => e.updated == true)));

		const jobsEditedResult = await this.editExperiences(id, jobs.filter(e => e.edited));
		dispatch(UserActions.editUserExperiences(jobsEditedResult.filter(e => e.updated == true)));

		const educationsRemovedResult = await this.removeEducations(id, educations.filter(e => e.deleted));
		dispatch(UserActions.removeUserEducations(educationsRemovedResult.filter(e => e.removed == true)));

		const jobsRemovedResult = await this.removeExperiences(id, jobs.filter(e => e.deleted));
		dispatch(UserActions.removeUserExperiences(jobsRemovedResult.filter(e => e.removed == true)));

		dispatch(EditUserActions.reset());

		const { navigation } = this.props;
		navigation.goBack();
	}

	render() {
		const { authUser, form, educations, educationsAdded, jobs, jobsAdded } = this.props;
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Edit profile</Text>
				<EditProfile 
					educations={educations.concat(educationsAdded).filter((education) => !education.deleted)} 
					jobs={jobs.concat(jobsAdded).filter((job) => !job.deleted)}
					name={authUser.name}
					login={authUser.login}
					about={authUser.about}
					clinks={authUser.clinks}
					country={authUser.country}
					city={authUser.city}
					site={authUser.site}
					handleSave={() => this.handleSave(authUser.id, form)}
					onAddEducationPress={this.onAddEducationPress}
					onAddExperiencePress={this.onAddExperiencePress}
					onEducationEdit={this.onEducationEdit}
					onExperienceEdit={this.onExperienceEdit}
					onEducationDelete={this.onEducationDelete}
					onExperienceDelete={this.onExperienceDelete}
				/>
			</KeyboardAwareScrollView>
		);
	}
}

function mapStateToProps({user, edituser, form}:any) {
	return {
		authUser: user.authUser,
		form: form.edit_profile,
		jobsAdded: edituser.jobsAdded || [],
		jobs: edituser.jobs || [],
		educationsAdded: edituser.educationsAdded || [],
		educations: edituser.educations || []
	};
}

export default connect(mapStateToProps)(withApollo(EditProfileScreen));