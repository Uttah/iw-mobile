import io from 'socket.io-client';

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
	const socket = io(baseURL, { transports: ['websocket']});

	socket.on('test', (data: any) => {
		console.log('data' + JSON.stringify(data));
	})
	
	const sendMessage = (text, partnerId) => {
		debugger;
		socket.emit('newMessage', { text, partnerId });
	}

	const sendTest = () => {
		socket.emit('test', { test: 'test' });
	}

	const subscribeToChat = (callback) => {
		debugger;
		socket.on('newChat', (data: any) => {
			callback(data);
		});
	}

	const subscribeToMessage = (callback) => {
		debugger;
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

	return {
		subscribeToChat,
		sendMessage,
		sendTest,
		subscribeToMessage,
		unmount
	};
};

export default create();