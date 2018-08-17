import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import Register from '../Components/Register';
import styles from './Styles/RegisterScreenStyles';
import HeaderLogo from '../Components/HeaderLogo';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class RegisterScreen extends Component<Props> {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>
	};

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