import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setMessages: ['chatMessages'],
  addMessage: ['message'],
  chatUnmount: []
});

export const ChatTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  contactsList: [],
  chatMessages: {}
};

export const setMessages = (state, action) => {
  const { chatMessages } = action;
  return {
    ...state,
    chatMessages: {
      ...state.chatMessages,
      [chatMessages.id]: chatMessages.messages
    }
  };
};

export const addMessage = (state, action) => {
  const { message } = action;
  const newMessages = [action.message].concat(state.chatMessages[message.chatId]);
  return {
    ...state,
    chatMessages: {
      ...state.chatMessages,
      [action.message.chatId]: newMessages
    }
  };
}

export const chatUnmount = (state, action) => {
  return INITIAL_STATE;
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGES]: setMessages,
  [Types.ADD_MESSAGE]: addMessage,
  [Types.CHAT_UNMOUNT]: chatUnmount
});