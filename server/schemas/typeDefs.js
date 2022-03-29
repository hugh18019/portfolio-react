const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    messages: [Message]
  }

  type Message {
    _id: ID
    sender: User
    content: String
    date: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    users: [User]
    current_user: User
    messages: [Message]
  }

  type Mutation {
    addUser(email: String!): Auth

    addUserTester(email: String!, password: String!): User

    updateUser(email: String, password: String!): User

    login(email: String!): Auth

    signup(email: String!): Auth

    addMessage(content: String!): Message
  }
`;

module.exports = typeDefs;
