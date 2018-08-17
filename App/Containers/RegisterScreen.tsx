import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Register from '../Components/Register';
import styles from './Styles/RegisterScreenStyles';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class RegisterScreen extends Component<Props> {
	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
			>
				<Text style={styles.headerTitle}>Регистрация</Text>
				<Register style={styles.register}/>
			</KeyboardAwareScrollView>
		);
	}
}