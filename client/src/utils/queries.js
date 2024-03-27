import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user(email: $email) {
      _id
      email
      favorites
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites {
    favorites
  }
`;