import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PixelRatio } from 'react-native';
import { Text } from 'native-base';
import Register from '../Components/Register';
import styles from './Styles/RegisterScreenStyles';
import UserActions from '../Redux/UserRedux';
import LoginActions from '../Redux/LoginRedux';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class RegisterScreen extends Component<Props> {

	state = {
		extraScrollHeight: 0
	};

	getExtraScrollHeight = () => {
		return this.state.extraScrollHeight;
	}

	onButtonViewLayout = (height) => {
		this.setState({
			extraScrollHeight: PixelRatio.getPixelSizeForLayoutSize(height)
		});
	}

	onSuccess = (userData) => {
		const { dispatch, navigation } = this.props;
		dispatch(UserActions.setUser(userData));
		dispatch(LoginActions.setLogin(userData.email));
		navigation.navigate('ProfileScreen');
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
				extraScrollHeight={this.getExtraScrollHeight()}
			>
				<Text style={styles.headerTitle}>Регистрация</Text>
				<Register 
					style={styles.register} 
					onButtonViewLayout={this.onButtonViewLayout}
					onSuccess={this.onSuccess}
				/>
			</KeyboardAwareScrollView>
		);
	}
}

export default connect()(RegisterScreen);