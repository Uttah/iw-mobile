import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container } from 'native-base';
//import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import { GiftedChat } from 'react-native-gifted-chat';
import MessageItem from '../Components/MessageItem';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class MessagesScreen extends Component<Props> {

	render() {
		return (
			<Container>
				<ScrollView>
					<MessageItem item={{ id: '1', messagesNum: 3 }} />
					<MessageItem item={{ id: '2', messagesNum: 0 }} />
				</ScrollView>
			</Container>
		);
	}
}

//export default connect()(MessagesScreen);