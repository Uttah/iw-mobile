import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import styles from './Styles/AddExperienceScreenStyles';
import AddEducation from '../Components/AddEducation';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class AddEducationScreen extends Component<Props> {

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
			>
				<Text style={styles.headerTitle}>Add education</Text>
				<AddEducation/>
			</KeyboardAwareScrollView>
		);
	}
}