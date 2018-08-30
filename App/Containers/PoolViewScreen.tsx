import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/LaunchScreenStyles';
import Pool from '../Components/Pool';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class PoolViewScreen extends Component<Props> {
	
	render () {
		const id = this.props.navigation.state.params.id;
		return (
			<KeyboardAwareScrollView 
				style={styles.mainContainer}  
			>
				<Pool poolId={id}/>
			</KeyboardAwareScrollView>
		)
	}
};