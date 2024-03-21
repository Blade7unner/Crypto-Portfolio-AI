const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    user(userId: ID): User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addFavorite(userId: ID!, favorite: String!): User
    removeFavorite(userId: ID!, favorite: String!): User
  }
`;

module.exports = typeDefs;
