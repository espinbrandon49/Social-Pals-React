import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      username
      createdAt
      reactions {
        _id
        reactionText
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionText: String!) {
    addReaction(thoughtId: $thoughtId, reactionText: $reactionText) {
      _id
      thoughtText
      username
      createdAt
      reactions {
        _id
        reactionText
        createdAt
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation addFriend($userId: ID, $friendId: ID) {
  addFriend(userId: $userId, friendId: $friendId) {
    userId
    friendId
    friends
  }
}
`
export const REMOVE_FRIEND = gql`
mutation removeFriend($userId: ID, $friendId: ID) {
  removeFriend(userId: $userId, friendId: $friendId) {
    userId
    friendId
    friends
  }
}
`

export const REMOVE_THOUGHT = gql`
  mutation removeThought($_id: String) {
    removeThought(_id: $_id) {        
      _id
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation removeReaction (
    $thoughtId: ID,
    $reactionId: ID,
    ) {
    removeReaction(
      thoughtId: $thoughtId,
      reactionId: $reactionId,
      ) {        
        _id
        thoughtText
        username
        createdAt
        reactions {
          _id
          reactionText
          createdAt
        }
    }
  }
`;

