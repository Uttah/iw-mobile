import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, PixelRatio } from 'react-native';
import { Text } from 'native-base';
import PoolAdd from '../Components/PoolAdd';
import styles from './Styles/PoolAddScreenStyles';
import HeaderLogo from '../Components/HeaderLogo';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class PoolAddScreen extends Component<Props> {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};

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

	onSuccess = (name) => {
		//this.props.dispatch(UserActions.registerSuccess(name));
		//this.props.navigation.navigate('ProfileScreen');
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
				extraScrollHeight={this.getExtraScrollHeight()}
			>
				<Text style={styles.headerTitle}>Создать пул</Text>
				<PoolAdd style={styles.poolAdd}/>
			</KeyboardAwareScrollView>
		);
	}
}

export default connect()(PoolAddScreen);