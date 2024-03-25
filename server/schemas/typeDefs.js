const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    favorites: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavorite(stockName: String!): User
    removeFavorite(stockName: String!): User
  }
`;

module.exports = typeDefs;
