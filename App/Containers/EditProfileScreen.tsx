import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Toast } from 'native-base';
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
import RootActions from '../Redux/RootRedux';

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

const educations = [
	{ id: guid(), name: 'Cambridge', from: '2001', to: '2002' },
	{ id: guid(), name: 'Oxford', from: '2010', to: '2012' },
];

class EditProfileScreen extends Component<Props> {

	onAddEducationPress = () => {
		this.props.navigation.navigate('AddEducationScreen');
	}

	onAddExperiencePress = () => {
		this.props.navigation.navigate('AddExperienceScreen');
	}

	handleSave = (id, form) => {
		const { name, login, country, city, site, about, fb, linkedin, twitter } = form.values;

		this.props.client.mutate({
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
		})
		.then((result:any) => {
			const { navigation } = this.props;
			navigation.goBack();
			navigation.state.params.onSubmitSuccess(result.data.updateUser);
		});
	}

	render() {
		const { authUser, form } = this.props;
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Edit profile</Text>
				<EditProfile 
					educations={educations} 
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

function mapStateToProps({user, form}:any) {
	return {
		authUser: user.authUser,
		form: form.edit_profile
	};
}

export default connect(mapStateToProps)(withApollo(EditProfileScreen));