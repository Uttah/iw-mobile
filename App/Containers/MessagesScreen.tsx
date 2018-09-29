import React, { Component } from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { withApollo } from 'react-apollo';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import MessageItem from '../Components/MessageItem';
import styles from './Styles/MessagesScreenStyles';
import { GET_CHATS } from '../Services/Graphql';
import ChatActions from '../Redux/ChatRedux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

const listTop = () => {
	return (
		<View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
			<Text style={styles.headerTitle}>Messages</Text>
		</View>
	);
}

const Chats = ({ items, onMessagePress }) => {
	return (
		<FlatList
			data={items}
			renderItem={({item}) => {
				return (
					<MessageItem item={item} onMessagePress={() => onMessagePress(item.chatId, item.parnter.id, item.parnter.name)}/>
				);
			}}
			keyExtractor={(item) => item.chatId}
			ListHeaderComponent={listTop()}
		/>
	);
};

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
		const { contactsList } = this.props;
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<Chats items={contactsList} onMessagePress={this.onMessagePress} />
				</ScrollView>
			</Container>
		);
	}
}

function mapStateToProps({user, chat}:any) {
	return {
		user: user.authUser,
		contactsList: chat.contactsList
  };
}

export default connect(mapStateToProps)(withApollo(MessagesScreen));