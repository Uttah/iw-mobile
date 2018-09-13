import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/MessagesNumStyles';

type Props = {
	messagesNum: number,
	style: any
};

export default class MessagesNum extends Component<Props> {
	render() {
		const { messagesNum, style } = this.props;
		return (
			<View style={[styles.container, style]}><Text style={styles.text}>{messagesNum}</Text></View>
		);
	}
}