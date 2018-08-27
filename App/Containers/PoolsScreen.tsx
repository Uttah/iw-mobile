import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, PixelRatio } from 'react-native';
import { Text } from 'native-base';
import Pools from '../Components/Pools';
import HeaderLogo from '../Components/HeaderLogo';
import styles from './Styles/PoolsScreenStyles';


type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class PoolsScreen extends Component<Props> {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};

	render() {
		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
			>
				<Text style={styles.headerTitle}>Пулы</Text>
				<Pools/>
			</KeyboardAwareScrollView>
		);
	}
}