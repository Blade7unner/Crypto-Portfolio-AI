import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      favorites {
        _id
        favItem
      }
    }
  }
`;

export const QUERY_FAVORITES = gql`
  query getFavorites {
    favorites {
      _id
      favItem
    }
  }
`;

export const QUERY_SINGLE_FAVORITE = gql`
  query getSingleFavorite($favoriteId: ID!) {
    favorite(favoriteId: $favroiteId) {
      _id
      favItem
    }
  }
`;
