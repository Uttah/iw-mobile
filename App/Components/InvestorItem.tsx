import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/InvestorItemStyles';

export default class InvestorItem extends Component {

	render() {
		const { id, name, login, countOfFollowers } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
				<View>
					<Text>name: {name}</Text>
					<Text>login: {login}</Text>
					<Text>countOfFollowers: {countOfFollowers}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}