import { createReducer, createActions } from 'reduxsauce';
import { objWithoutKey } from '../Services/Utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setMessages: ['chatMessages'],
  addMessage: ['message'],
  addOlderMessages: ['messages'],
  chatUnmount: [],
  addContact: ['contact'],
  setContacts: ['contacts'],
  updateContact: ['contact']
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

export const addOlderMessages = (state, action) => {
  const { messages } = action;
  return {
    ...state,
    chatMessages: {
      ...state.chatMessages,
      [action.messages.chatId]: [...state.chatMessages[action.messages.chatId], ...action.messages.messages.reverse()]
    }
  };
}

export const addContact = (state, action) => {
  const { contact } = action;
  return {
    ...state,
    contactsList: state.contactsList.concat(contact)
  }
}

export const setContacts = (state, action) => {
  const { contacts } = action;
  return {
    ...state,
    contactsList: contacts
  }
}

export const updateContact = (state, action) => {
  const { contact } = action;
  const i = state.contactsList.findIndex((_contact) => _contact.chatId === contact.chatId);
  const newContactsList = objWithoutKey(state.contactsList, i);
  newContactsList[i] = contact;
  return {
    ...state,
    contactsList: newContactsList
  }
}

export const chatUnmount = (state, action) => {
  return {...state, chatMessages: {}};
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGES]: setMessages,
  [Types.ADD_MESSAGE]: addMessage,
  [Types.ADD_OLDER_MESSAGES]: addOlderMessages,
  [Types.SET_CONTACTS]: setContacts,
  [Types.UPDATE_CONTACT]: updateContact,
  [Types.CHAT_UNMOUNT]: chatUnmount
});