import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { Container, Text } from 'native-base';
//import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import MessageItem from '../Components/MessageItem';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class MessagesScreen extends Component<Props> {
	renderItem = ({ item }) => {
		return (
			<MessageItem item={item} onReplyPress={this.onReplyPress}/>
		);
	};

	onReplyPress = () => {
		this.props.navigation.navigate('MessageScreen');
	}

	listTop = () => {
		return (
			<View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
				<Text style={styles.headerTitle}>Messages</Text>
			</View>
		);
	}
 
	render() {
		const items = [
			{ id: '1', messagesNum: 3, author: 'Иван Фёдоров' },
			{ id: '2', messagesNum: 0, author: 'Елена Кукушкина' }
		];
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<FlatList
						data={items}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={this.listTop()}
					/>
				</ScrollView>
			</Container>
		);
	}
}

//export default connect()(MessagesScreen);