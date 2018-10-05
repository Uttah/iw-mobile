import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import styles from './Styles/AddExperienceScreenStyles';
import AddExperience from '../Components/AddExperience';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class RegisterScreen extends Component<Props> {

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Add experience</Text>
				<AddExperience/>
			</KeyboardAwareScrollView>
		);
	}
}