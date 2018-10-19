import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Text, Button, Fab } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/PoolViewScreenStyles';
import Pool from '../Components/Pool';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class PoolViewScreen extends Component<Props> {	
	render () {
		const {id} = this.props.navigation.state.params;
		return (
			<Container style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
				<ScrollView style={styles.mainContainer}>
					{id && <Pool poolId={id}/>}
				</ScrollView>
				<Button 
					full 
					primary 
					style={styles.button} 
					disabled={false} 
					onPress={(e) => alert('you pressed button')}
				>
					<Text uppercase={false} style={styles.buttonText}>Invest</Text>
				</Button> 
			</Container>
		)
	}
};