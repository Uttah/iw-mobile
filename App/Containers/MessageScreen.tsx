import React, { Component } from 'react';
import { Platform, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Spinner } from 'native-base';
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
	let chatMessages = {};
	try {
		const result = await client.query({
			query: GET_CHAT_MESSAGES,
			variables: { input: { chatId: chatId, skip: 0 } },
			fetchPolicy: 'network-only'
		});
		const messages = result.data.getChatMessages;
		chatMessages = {
			id: chatId,
			messages: messages
		};
  } catch(err) {
    alert(err); 
	}
	return chatMessages;
};

class MessageScreen extends Component<Props> {
	state = {
		chatId: null,
		isLoading: false
	}

	subscribeToChatCb = (data) => {
		const { dispatch } = this.props;
		const { partnerId } = this.props.navigation.state.params;
		const isMyMessageSent = data.parnter.id === partnerId && data.lastMessage.author.id === this.props.user.id;
		const isMyMessageReceived = data.parnter.id === partnerId && data.lastMessage.author.id === partnerId;
		const isCurrChat = isMyMessageSent || isMyMessageReceived;
		const setChatId = this.state.chatId === null && isCurrChat;

		setChatId && this.setState({
			chatId: data.chatId
		});
		if (isMyMessageSent) {
			this.setState({
				isLoading: false
			});
		}
		//для всех чатов
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
			if (message.author.id == this.props.user.id) {
				this.setState({
					isLoading: false
				});
			}
		} else {
			contact.parnter = {
				id: message.author.id,
				name: message.author.name
			}
		}
		dispatch(ChatActions.updateContact(contact));
	}
	
	async componentDidMount() {
		let chatId:string;
		if ('chatId' in this.props.navigation.state.params) {
			chatId = this.props.navigation.state.params.chatId;
			this.setState({ chatId });

			if (!(chatId in this.props.chatMessages)) {
				const { dispatch } = this.props;
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
		this.setState({
			isLoading: true
		});
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
				createdAt: (new Date(message.date)).toISOString(),
				user: {
					_id: message.author.id,
					name: message.author.name,
					avatar: 'https://placeimg.com/140/140/any',
				}
			}	
		));
	}

	render() {
		const { partnerId } = this.props.navigation.state.params;
		const messages = this.getChatMessages(this.props.chatMessages, this.state.chatId);
		
		return (
			<Container>
				<GiftedChat
					messages={messages}
					onSend={newMessages => this.onSend(newMessages, partnerId)}
					user={{
						_id: this.props.user.id
					}}
					renderAvatar={this.renderAvatar}
					isLoading={this.state.isLoading}
				/>
				{Platform.OS !== 'ios' && <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80}/>}
			</Container>
		);
	}
}

const mapStateToProps = ({chat, user}:any) => {
	return {
		chatMessages: chat.chatMessages || {},
		user: user.authUser,
		contactsList: chat.contactsList
	}
};

export default connect(mapStateToProps)(withApollo(MessageScreen));