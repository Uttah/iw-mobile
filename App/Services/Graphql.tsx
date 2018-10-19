import gql from 'graphql-tag';

export const GET_CHAT_MESSAGES = gql`
query getChatMessages($input: ChatInput!) {
  getChatMessages(input: $input) {
    nextMessages, 
    messages {
      id
      author {
        id
        name
      }
      content
      date
      read
    }
  }
}
`;

export const GET_USER = gql`
query getUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    name
    login
    about
    email
    phone
    country
    city
    site
    clinks {
      fb
      linkedin
      twitter
    }
    educations {
      id
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
  chatId
  countUnreadMessages
  parnter {
    id
    name
  }
  messages {
    id
    author {
      id
      name
    }
    content
    read
    date
  }
}
}`;

export const ADD_JOB = gql`
mutation addJob($userId: ID!, $input: ExpirienceInput!) {
  addJob(userId: $userId, input: $input)
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($userId: ID!, $id: ID!, $input: ExpirienceInput!) {
  updateJob(userId: $userId, id: $id, input: $input)
}
`;

export const REMOVE_JOB = gql`
mutation removeJob($userId: ID!, $id: ID!) {
  removeJob(userId: $userId, id: $id)
}
`;

export const ADD_EDUCATION = gql`
mutation addEducation($userId: ID!, $input: ExpirienceInput!) {
  addEducation(userId: $userId, input: $input)
}
`;

export const UPDATE_EDUCATION = gql`
mutation updateEducation($userId: ID!, $id: ID!, $input: ExpirienceInput!) {
  updateEducation(userId: $userId, id: $id, input: $input)
}
`;

export const REMOVE_EDUCATION = gql`
mutation removeEducation($userId: ID!, $id: ID!) {
  removeEducation(userId: $userId, id: $id)
}
`;

export const UPDATE_USER = gql`
mutation updateUser($input: UserInput!) {
  updateUser(input: $input) {
    id
    name
    login
    email
    phone
    country
    city
    site
    clinks {
      fb
      linkedin
      twitter
    }
    educations {
      id
      name
      from
      to
    }
    jobs {
      id
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
    pmsenders
    commenters
    twoFactorAuth
    about
    language
  }
}
`;