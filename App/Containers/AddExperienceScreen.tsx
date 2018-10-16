import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/AddExperienceScreenStyles';
import AddExperience from '../Components/AddExperience';
import EditUserActions from '../Redux/EditUserRedux';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class AddExperienceScreen extends Component<Props> {
	onSave = () => {
		const { dispatch, navigation, job } = this.props;
		!!job && dispatch(EditUserActions.addJob(job));
		navigation.goBack();
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Add job</Text>
				<AddExperience onSave={this.onSave}/>
			</KeyboardAwareScrollView>
		);
	}
}

const mapStateToProps = ({form}:any) => {
	return {
		job: form.add_experience ? form.add_experience.values : []
	}
};


export default connect(mapStateToProps)(AddExperienceScreen);