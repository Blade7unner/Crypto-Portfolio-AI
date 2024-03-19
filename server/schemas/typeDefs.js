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
    register(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
