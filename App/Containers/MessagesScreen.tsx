import React, { Component } from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { withApollo } from 'react-apollo';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import { GET_CHATS } from '../Services/Graphql';
import ChatActions from '../Redux/ChatRedux';
import Chats from '../Components/Chats';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class MessagesScreen extends Component<Props> {
	async componentDidMount() {
		const { dispatch } = this.props;
		const result = await this.props.client.query({
			query: GET_CHATS,
			variables: {userId: this.props.user.id},
			fetchPolicy: 'network-only'
		});
		const contacts = result.data.getChats.slice().reverse();
		dispatch(ChatActions.setContacts(contacts));
	}
  
	onMessagePress = (chatId, partnerId, partnerName) => {
		this.props.navigation.navigate('MessageScreen', { chatId, partnerId, partnerName });
	}
  
	render() {
		const { contactsList, chatMessages, user } = this.props;
		const updatedContacts = contactsList.map((contact:any) => {
			let count = 0;
			chatMessages[contact.chatId] && chatMessages[contact.chatId].forEach((message:any) => {
				if (!message.read && message.author.id !== user.id) ++count;
			});
			return {
        ...contact,
        lastMessage: chatMessages[contact.chatId] ? chatMessages[contact.chatId][chatMessages[contact.chatId].length-1] : contact.messages[contact.messages.length-1],
        newMessages: count
      }
    });
        
    return (
      <Container>
      <ScrollView style={styles.mainContainer}>
      <Chats items={updatedContacts} onMessagePress={this.onMessagePress} />
      </ScrollView>
      </Container>
    );
  }
}
      
function mapStateToProps({user, chat}:any) {
  return {
    user: user.authUser,
    contactsList: chat.contactsList,
    chatMessages: chat.chatMessages
  };
}

export default connect(mapStateToProps)(withApollo(MessagesScreen));