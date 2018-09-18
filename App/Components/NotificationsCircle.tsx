import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/NotificationsCircleStyles';

type Props = {
	style: any
};

export default class NotificationsCircle extends Component<Props> {
	render() {
		const { style } = this.props;
		return (
			<View style={[styles.container, style]}></View>
		);
	}
}