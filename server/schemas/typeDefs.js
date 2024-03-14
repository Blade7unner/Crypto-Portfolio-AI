const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
