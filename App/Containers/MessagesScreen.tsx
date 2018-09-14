import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Container } from 'native-base';
//import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import MessageItem from '../Components/MessageItem';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class MessagesScreen extends Component<Props> {
	renderItem = ({ item }) => {
		return (
			<MessageItem item={item} />
		);
	};

	render() {
		const items = [
			{ id: '1', messagesNum: 3 },
			{ id: '2', messagesNum: 0 }
		];
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<FlatList
						data={items}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id}
					/>
				</ScrollView>
			</Container>
		);
	}
}

//export default connect()(MessagesScreen);