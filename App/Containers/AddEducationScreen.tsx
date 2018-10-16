import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/AddExperienceScreenStyles';
import AddEducation from '../Components/AddEducation';
import EditUserActions from '../Redux/EditUserRedux';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class AddEducationScreen extends Component<Props> {
	onSave = () => {
		const { dispatch, navigation, education } = this.props;
		!!education && dispatch(EditUserActions.addEducation(education));
		navigation.goBack();
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Add education</Text>
				<AddEducation onSave={this.onSave}/>
			</KeyboardAwareScrollView>
		);
	}
}

const mapStateToProps = ({form}:any) => {
	return {
		education: form.add_education ? form.add_education.values : []
	}
};


export default connect(mapStateToProps)(AddEducationScreen);