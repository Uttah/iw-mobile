import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import styles from './Styles/CommentItemStyles';

export default class CommentItem extends Component {

	render() {
		const { id, author, content, time } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
					<TouchableHighlight style={styles.avatarWrap}>
						<View>
							<Image
								source={Images.noAvatar}
								resizeMode={'contain'}
								style={styles.avatar}
							/> 
						</View>          
					</TouchableHighlight>
					<View style={styles.content}>
						<Text style={styles.text}>{author} {content}</Text>
					</View>
					<View style={styles.time}><Text style={styles.timeText}>{time}</Text></View>
        </View>
			</TouchableOpacity>
		);
	}
}