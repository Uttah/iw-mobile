import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import Author from '../Components/Author';
import { Images } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/MessageItemStyles';

export default class MessageItem extends Component {
	render() {
		const { id, messagesNum } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
					<Author 
						style={styles.author} 
						author={'Иван Фёдоров'} 
						date={{}}
						authorNameStyle={styles.authorName}
						messagesNum={messagesNum}
					/>
					<View style={styles.time}><Text style={styles.timeText}>6:19 PM</Text></View>
        </View>
			</TouchableOpacity>
		);
	}
}