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
mutation addJob($input: ExpirienceInput!) {
  addJob(input: $input)
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($id: ID!, $input: ExpirienceInput!) {
  updateJob(id: $id, input: $input)
}
`;

export const REMOVE_JOB = gql`
mutation removeJob($id: ID!) {
  removeJob(id: $id)
}
`;

export const ADD_EDUCATION = gql`
mutation addEducation( $input: ExpirienceInput!) {
  addEducation(input: $input)
}
`;

export const UPDATE_EDUCATION = gql`
mutation updateEducation($id: ID!, $input: ExpirienceInput!) {
  updateEducation(id: $id, input: $input)
}
`;

export const REMOVE_EDUCATION = gql`
mutation removeEducation($id: ID!) {
  removeEducation(id: $id)
}
`;

export const UPDATE_USER = gql`
mutation updateUser($input: UserInput!) {
  updateUser(input: $input) {
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

export const SEARCH_POST_IN_PROFILE = gql`
  query searchPostInProfile($userId: ID!, $searchText: String!) {
    searchPostInProfile(userId: $userId, searchText: $searchText) {
      posts {
        postId
        userId
        userName
        userLogin
        avatar
        date
        edited
        content
        likes
        comments
        tags
        attachments
      }
      reposts {
        id
        postId
        userId
        userName
        userLogin
        avatar
        date
        edited
        content
        tags
        reposted
        likes
      }
    }
  }
`;

export const SET_PM_SENDERS = gql`
  mutation setPMSendersMode($mode: String!) {
    setPMSendersMode(mode: $mode)
  }
`;

export const SET_COMMENTERS = gql`
  mutation setCommentersMode($mode: String!) {
    setCommentersMode(mode: $mode)
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId)
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(userId: $userId)
  }
`;

export const GET_SUBSCRIBERS = gql`
  query getSubscribers($userId: ID!) {
    getSubscribers(userId: $userId) {
      id
      name
      photo
      avatar
    }
  }
`;
