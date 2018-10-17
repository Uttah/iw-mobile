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
	}

	render() {
		const { authUser } = this.props;
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
				extraScrollHeight={this.getExtraScrollHeight()}
			>
				<Text style={styles.headerTitle}>Создать пул</Text>
				<PoolAdd style={styles.poolAdd} authUser={authUser}/>
			</KeyboardAwareScrollView>
		);
	}
}

function mapStateToProps(state) {
	let obj = {};
	obj.authUser = state.user.authUser;
	return obj;
}

export default connect(mapStateToProps)(PoolAddScreen);