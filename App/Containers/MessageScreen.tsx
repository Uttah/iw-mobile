import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessageScreenStyles';
import { GiftedChat } from 'react-native-gifted-chat';
import { Images } from 'App/Themes';
import { GET_CHAT_MESSAGES } from '../Services/Graphql';
import { withApollo } from 'react-apollo';
import ChatActions from '../Redux/ChatRedux';
import socket from '../Services/Socket';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

const fetchMessages = async (client:any, chatId:any) => {
	const result = await client.query({
		query: GET_CHAT_MESSAGES,
		variables: { input: { chatId: chatId, skip: 0 } },
		fetchPolicy: 'network-only'
	});
	const messages = result.data.getChatMessages;
	const chatMessages = {
		id: chatId,
		messages: messages
	};
	return chatMessages;
};

class MessageScreen extends Component<Props> {
	subscribeToChatCb = (data) => {
		console.log('new chat');
	}
	
	subscribeToMessageCb = (message) => {
		const { dispatch } = this.props;
		console.log('callback to message id ' + message.id);
		dispatch(ChatActions.addMessage(message));
	}
	
	async componentDidMount() {
		socket.subscribeToChat((data: any) => this.subscribeToChatCb(data));
		socket.subscribeToMessage((message:any) => this.subscribeToMessageCb(message));

		const { dispatch } = this.props;
		const chatId = this.props.navigation.state.params.chatId;
		if (!(chatId in this.props.chatMessages)) {
			fetchMessages(this.props.client, chatId).then((data) => {
				dispatch(ChatActions.setMessages(data));
			});
		}
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		socket.unmount();
		dispatch(ChatActions.chatUnmount());
	}
	
	onSend(messages = [], partnerId) {
		socket.sendMessage(messages[0].text, partnerId);
	}
	
	renderAvatar = () => {
		return (
			<Image
				source={Images.noAvatar}
				resizeMode={'contain'}
				style={styles.avatar}
			/> 
		);
	};

	getChatMessages = (chatMessages:any, chatId:string) => {
		if (!(chatId in chatMessages) || chatMessages.length == 0) {
			return [];
		}
		const messages = chatMessages[chatId];
		return messages.map((message) => (
			{
				_id: message.id,
				text: message.content,
				createdAt: message.date,
				user: {
					_id: message.author.id,
					name: message.author.name,
					avatar: 'https://placeimg.com/140/140/any',
				}
			}	
		));
	}

	render() {
		const { chatId, partnerId } = this.props.navigation.state.params;
		let messages = this.getChatMessages(this.props.chatMessages, chatId);
		
		return (
			<Container>
				<GiftedChat
					messages={messages}
					onSend={messages => this.onSend(messages, partnerId)}
					user={{
						_id: this.props.user.id
					}}
					renderAvatar={this.renderAvatar}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		chatMessages: state.chat.chatMessages || {},
		user: state.user.authUser
	}
};

export default connect(mapStateToProps)(withApollo(MessageScreen));