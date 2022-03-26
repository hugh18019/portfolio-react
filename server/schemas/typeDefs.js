const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
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
    messages: [Message]
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth

    addUserTester(email: String!, password: String!): User

    updateUser(email: String, password: String!): User

    login(email: String!, password: String!): Auth

    addMessage(sender: ID!, content: String!): Message
  }
`;

module.exports = typeDefs;
