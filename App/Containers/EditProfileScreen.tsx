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

const jobs = [
	{ id: guid(), name: 'IPU RAS', from: '2009', to: '2010' },
	{ id: guid(), name: 'Google', from: '2010', to: '2018' },
];

class EditProfileScreen extends Component<Props> {
	componentDidMount(){
		const { dispatch, authUser, navigation } = this.props;
		dispatch(EditUserActions.setJobs(authUser.jobs));
		dispatch(EditUserActions.setEducations(authUser.educations));
	}

	onAddEducationPress = () => {
		this.props.navigation.navigate('AddEducationScreen');
	}

	onAddExperiencePress = () => {
		this.props.navigation.navigate('AddExperienceScreen');
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
			id: data.addEducation
		}
	}

	addEducations = async(id, educations) => {
		return Promise.all(educations.map((education) => this.addEducation(id, education)));
	}

	handleSave = async(id, form) => {
		const { name, login, country, city, site, about, fb, linkedin, twitter } = form.values;
		const { dispatch, jobsAdded, educationsAdded } = this.props;

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

		const educationsAddedResult = await this.addEducations(id, educationsAdded);
		dispatch(UserActions.addUserEducations(educationsAddedResult));

		dispatch(EditUserActions.reset());

		const { navigation } = this.props;
		navigation.goBack();
	}

	render() {
		const { authUser, form, educations, educationsAdded } = this.props;
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Edit profile</Text>
				<EditProfile 
					educations={educations.concat(educationsAdded)} 
					jobs={jobs}
					onAddEducationPress={this.onAddEducationPress}
					onAddExperiencePress={this.onAddExperiencePress}
					name={authUser.name}
					login={authUser.login}
					about={authUser.about}
					clinks={authUser.clinks}
					country={authUser.country}
					city={authUser.city}
					site={authUser.site}
					handleSave={() => this.handleSave(authUser.id, form)}
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