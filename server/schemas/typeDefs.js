const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    users: [User]
  }

  type Mutation {
    addUser(
      username: String
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): Auth

    addUserTester(email: String!, password: String!): User

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String!
    ): User

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
