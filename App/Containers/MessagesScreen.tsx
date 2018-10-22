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
  componentDidMount() {
    const { dispatch, user } = this.props;
    //здесь разобраться
    this.props.client.query({
      query: GET_CHATS,
      variables: {userId: user.id},
      fetchPolicy: 'network-only'
    })
    .then(result => {   
      const contacts = result.data.getChats.slice().reverse();
      dispatch(ChatActions.setContacts(contacts));
    })
    .catch(error => { 
      console.log(error);
      dispatch(ToastActionsCreators.displayError('error!'));
    });
  }
  
  onMessagePress = (chatId, partnerId, partnerName) => {
    this.props.navigation.navigate('MessageScreen', { chatId, partnerId, partnerName });
  }
  
  render() {
    const { contactsList, chatMessages, user } = this.props;
    const updatedContacts = contactsList.map((contact:any) => {
      const messages = chatMessages[contact.chatId] ? chatMessages[contact.chatId] : contact.messages;
      let count = 0;
      
      messages.forEach((message:any) => {
        if (!message.read && message.author.id !== user.id) ++count;
      });
      return {
        ...contact,
        lastMessage: messages[messages.length-1],
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