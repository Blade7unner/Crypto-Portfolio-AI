const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    favorites: [String]!
  }

  type Favorite {
    _id: ID!
    favItem: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    favorites(email: String!): [Favorite]
    favorite(favoriteId: ID!): Favorite
  }

  type Mutation {
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavorite(favItem: String! email: String!): Favorite
    removeFavorite(favoriteId: ID!): Favorite
  }
`;

module.exports = typeDefs;
