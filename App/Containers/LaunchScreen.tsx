import React, { Component } from 'react';
import { Text, Image, View, PixelRatio } from 'react-native';
import { Images } from 'App/Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import Login from 'App/Components/Login';
import styles from './Styles/LaunchScreenStyles';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class LaunchScreen extends Component<Props> {
	static navigationOptions = {
		header: null
	};
	
	state = {
		extraScrollHeight: 0
	};
	
	onRegisterPress = () => {
		this.props.navigation.navigate('RegisterScreen');
	}
	
	onButtonViewLayout = (height) => {
		this.setState({
			extraScrollHeight: PixelRatio.getPixelSizeForLayoutSize(height)
		});
	}
	
	getExtraScrollHeight = () => {
		return this.state.extraScrollHeight;
	}
	
	render () {
		return (
			<KeyboardAwareScrollView 
				style={styles.mainContainer}  
				enableOnAndroid={true}
				extraScrollHeight={this.getExtraScrollHeight()}
			>
				<View style={styles.landing}>
					<Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
					<Text style={styles.motivation}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
				</View>
				<Login
					style={styles.login} 
					onRegisterPress={this.onRegisterPress}
					onButtonViewLayout={(height) => this.onButtonViewLayout(height)}
				/>
			</KeyboardAwareScrollView>
		)
	}
}
