import gql from 'graphql-tag';

export const GET_CHAT_MESSAGES = gql`
	query getChatMessages($input: ChatInput!) {
		getChatMessages(input: $input) {
			id
			author {
				id
				name
			}
			content
			date
		}
	}
`;

export const GET_USER = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			id
			name
			login
			email
			phone
			country
			city
			educations {
				name
				from
				to
			}
			jobs {
				name
				from
				to
			}
			wallets {
				id
				kind
				address
			}
			notifications
			language
		}
	}
`;

export const GET_CHATS = gql`
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