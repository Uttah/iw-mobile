import React from 'react';
import { Query } from 'react-apollo';
import { View, FlatList } from 'react-native';
import { Text, Spinner } from 'native-base';
import gql from 'graphql-tag';
import styles from './Styles/MessagesStyles';
import MessageItem from '../Components/MessageItem';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
	userId: number,
	onReplyPress: any,
	fakeItems: any
};

const listTop = () => {
	return (
		<View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
			<Text style={styles.headerTitle}>Messages</Text>
		</View>
	);
}

const Chats = ({ items, onPress }) => (
	<FlatList
		data={items}
		renderItem={({item}) => {
			return (
				<MessageItem item={item} onReplyPress={onPress}/>
			);
		}}
		keyExtractor={(item) => item.id}
		ListHeaderComponent={listTop()}
	/>
);

export default function Messages({userId, fakeItems, onReplyPress}: Props) {
	return (
		<Query query={GET_CHATS} variables={{userId}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Spinner/>;
				} 

				if (error) {
					console.log(JSON.stringify(error));
				}
				
				if (data && data.getChats) {
					return (
						<Chats items={data.getChats} onPress={onReplyPress} />
					);
				} else {
					return (
						<Chats items={fakeItems} onPress={onReplyPress} />
					)
				}

			}}
		</Query>
	)
}

const GET_CHATS = gql`
query getChats($userId: ID!){
	getChats(userId: $userId) {
		chatId,
		parnter {
			id,
			name
		},
		lastMessage {
			id,
			author {
				id,
				name
			},
			content,
			date
		}
	}
}`;