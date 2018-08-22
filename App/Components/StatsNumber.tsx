import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/StatsNumberStyles';

export default class StatsNumber extends Component {
	render() {
    const { number, text } = this.props;
		return (
			<TouchableHighlight style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
			</TouchableHighlight>
		);
	}
}