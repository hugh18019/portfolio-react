import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($sender: ID!, $content: String!) {
    addOrder(sender: $sender, content: $content) {
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
