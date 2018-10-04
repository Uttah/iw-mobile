import io from 'socket.io-client';

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
	const logEvent = (event) => {
		const timeNow = new Date();
		console.log(timeNow.toLocaleDateString() + timeNow.toLocaleTimeString() + ': ' + event);
	}
	
	const socket = io(baseURL, { transports: ['websocket'], forceNew: true});
	logEvent('socket created');

	// on reconnection, reset the transports option, as the Websocket
	// connection may have failed (caused by proxy, firewall, browser, ...)
	socket.on('reconnect_attempt', () => {
		const timeNow = new Date();
		logEvent('reconnect_attempt');
		//socket.io.opts.transports = ['polling', 'websocket'];
	});

	socket.on('connect_error', (error) => {
		logEvent('connect_error, error: ' + JSON.stringify(error));
	});

	socket.on('connect_timeout', (timeout) => {
		logEvent('connect_timeout, timeout: ' + timeout);
	});

	socket.on('error', (error) => {
		logEvent('error, error: ' + JSON.stringify(error));
	});

	socket.on('disconnect', (reason) => {
		logEvent('disconnect, reason: ' + reason);
		// if (reason === 'io server disconnect') {
		// 	// the disconnection was initiated by the server, you need to reconnect manually
		// 	socket.connect();
		// }
		// else the socket will automatically try to reconnect
	});

	socket.on('reconnect', (attemptNumber) => {
		logEvent('reconnect, attemptNumber: ' + attemptNumber);
	});

	socket.on('reconnecting', (attemptNumber) => {
		logEvent('reconnecting, attemptNumber: ' + attemptNumber);
	});

	socket.on('reconnect_error', (error) => {
		logEvent('reconnect_error, error: ' + JSON.stringify(error));
	});

	socket.on('reconnect_failed', () => {
		logEvent('reconnect_failed');
	});

	socket.on('ping', () => {
		logEvent('ping');
	});

	socket.on('pong', () => {
		logEvent('pong');
	});

	socket.on('test', (data: any) => {
		console.log('data' + JSON.stringify(data));
	})
	
	const sendMessage = (text, partnerId) => {
		socket.emit('newMessage', { text, partnerId });
	}

	const sendTest = () => {
		socket.emit('test', { test: 'test' });
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
		socket.removeAllListeners();
		// socket.off('newChat');
		// socket.off('newMessage');
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