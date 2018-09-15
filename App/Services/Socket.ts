import io from 'socket.io-client';

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
	const socket = io(baseURL, { transports: ['websocket']});
	socket.on('test', (data: any) => {
		console.log('data' + JSON.stringify(data));
	});

	const sendMessage = () => {
		socket.emit('test', { test: 'test' });
	}

	return {
		sendMessage
	};
};

export default create();