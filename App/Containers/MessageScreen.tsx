import React, { Component } from 'react';
import { Platform, Image, KeyboardAvoidingView } from 'react-native';
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

const platform = Platform.OS;

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
	state = {
		chatId: null
	}

	subscribeToChatCb = (data) => {
		const { dispatch } = this.props;
		const { partnerId } = this.props.navigation.state.params;
		const setChatId = this.state.chatId === null;
		//const setChatId = this.state.chatId === null && data.lastMessage.
		setChatId && this.setState({
			chatId: data.chatId
		});
		const chatMessages = {
			id: data.chatId,
			messages: [data.lastMessage]
		};
		dispatch(ChatActions.setMessages(chatMessages));
		dispatch(ChatActions.addContact(data));
	}
	
	subscribeToMessageCb = (message) => {
		const { dispatch } = this.props;
		dispatch(ChatActions.addMessage(message));
		const contact = {
			chatId: message.chatId,
			lastMessage: {
				content: message.content,
				date: message.date,
				id: message.id,
				author: {
					id: message.author.id,
					name: message.author.name
				}
			}
		};
		if (this.state.chatId == message.chatId) {
			const { partnerId, partnerName } = this.props.navigation.state.params;
			contact.parnter = {
				id: partnerId,
				name: partnerName
			};
		} else {
			contact.parnter = {
				id: message.author.id,
				name: message.author.name
			}
		}
		dispatch(ChatActions.updateContact(contact));
	}
	
	async componentDidMount() {
		if ('chatId' in this.props.navigation.state.params) {
			const { dispatch } = this.props;
			const chatId = this.props.navigation.state.params.chatId;
			this.setState({ chatId });
			if (!(chatId in this.props.chatMessages)) {
				fetchMessages(this.props.client, chatId).then((data) => {
					dispatch(ChatActions.setMessages(data));
				});
			}
		}
		socket.subscribeToChat((data: any) => this.subscribeToChatCb(data));
		socket.subscribeToMessage((message:any) => this.subscribeToMessageCb(message));
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
		if (chatId == null || !(chatId in chatMessages) || chatMessages.length == 0) {
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
		const { partnerId, partnerName } = this.props.navigation.state.params;
		let messages = this.getChatMessages(this.props.chatMessages, this.state.chatId);
		
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
				{Platform.OS !== 'ios' && <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80}/>}
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