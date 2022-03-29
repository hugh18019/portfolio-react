import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email) {
      token
      user {
        _id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!) {
    signup(email: $email) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($content: String!) {
    addMessage(content: $content) {
      content
      date
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String
    $firstName: String
    $lastName: String
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER_TESTER = gql`
  mutation addUserTester($email: String!, $password: String!) {
    addUserTester(email: $email, password: $password) {
      user {
        _id
        email
      }
    }
  }
`;
