import io from 'socket.io-client';

const guid = ()  =>{
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
  let socket:any;
  const logs = [];

  const logEvent = (event) => {
    const timeNow = new Date();
    const logTime = timeNow.toLocaleDateString() + ' ' + timeNow.toLocaleTimeString();
    logs.push({id: guid(), time: logTime, text: event});
    console.log(logTime + ' ' + event);
  }

  const init = () => {
    socket = io(baseURL, { transports: ['websocket'], forceNew: true});
    logEvent('socket created');
    bindListeners();
  }

  const bindListeners = () => {
    // on reconnection, reset the transports option, as the Websocket
    // connection may have failed (caused by proxy, firewall, browser, ...)
    socket.on('reconnect_attempt', () => {
      logEvent('reconnect_attempt');
      //socket.io.opts.transports = ['polling', 'websocket'];
    });

    socket.on('connect', () => {
      logEvent('socket connected');
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
      socket.connect();
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
  }

  const sendMessage = (text, partnerId) => {
    socket.emit('newMessage', { text, partnerId });
    logEvent('newMessage, text: ' + text + ', partnerId: ' + partnerId);
  }

  const sendTest = () => {
    socket.emit('test', { test: 'test' });
  }

  const subscribeToChat = (callback) => {
    socket.on('newChat', (data: any) => {
      callback(data);
      logEvent('newChat, data: ' + JSON.stringify(data));
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
      logEvent('newMessage, data: ' + JSON.stringify(data));
    });
  }

  const readMessage = (unread, partnerId) => {
    socket.emit('readMessage', {
      messageIds: unread,
      partnerId: partnerId
    });
  }

  const unmount = () => {
    socket.removeAllListeners();
  }

  const getLogs = () => {
    return logs;
  }

  const close = () => {
    socket.close();
  }

  const connect = () => {
    socket.connect();
  }

  return {
    init,
    subscribeToChat,
    sendMessage,
    sendTest,
    subscribeToMessage,
    readMessage,
    unmount,
    getLogs,
    close,
    connect
  };
};

export default create();