import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/ProfileTopStyles';
import StatsNumbers from './StatsNumbers';
import { Images } from 'App/Themes';

export default class ProfileTop extends Component {
	render() {
		const stats = this.props.stats;
		return (
			<View style={styles.outer}>
				<View style={styles.container}>
					<TouchableHighlight style={styles.avatarWrap}>
						<Image
							source={Images.noAvatar}
							resizeMode={'contain'}
							style={styles.avatar}
						/>
					</TouchableHighlight>
					<StatsNumbers style={styles.numbers} stats={stats}/>
				</View>
				<Text style={styles.author}>Владислава Константиновна Карамагамедовна-ФазыльОглы</Text>
				<Text style={styles.nickname}>@hotchick</Text>
			</View>
		);
	}
}