import { gql } from "@apollo/client";

export const QUERY_ALL_MESSAGES = gql`
  {
    messages {
      _id
      sender {
        _id
        email
      }
      content
      date
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  {
    users {
      firstName
      lastName
      orders {
        _id
        products {
          _id
          name
          description
          price
          quantity
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        products {
          _id
        }
      }
    }
  }
`;
