import io from 'socket.io-client';

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
	const socket = io(baseURL, { transports: ['websocket']});
	
	const sendMessage = (text, partnerId) => {
		socket.emit('newMessage', { text, partnerId });
	}

	const subscribeToChat = (callback) => {
		socket.on('newChat', (data: any) => {
			callback(data);
		});
	}

	const subscribeToMessage = (callback) => {
		socket.on('newMessage', (data:any) => {
			const message = {
				id: data.messageId,
				chatId: data.chatId,
				author: data.author,
				content: data.content,
				date: data.date
			};
			callback(message);
		});
	}

	const unmount = () => {
		socket.off('newChat');
		socket.off('newMessage');
	}

	const removeAllListeners = () => {
		socket.removeAllListeners();
	}

	return {
		subscribeToChat,
		sendMessage,
		subscribeToMessage,
		unmount,
		removeAllListeners
	};
};

export default create();