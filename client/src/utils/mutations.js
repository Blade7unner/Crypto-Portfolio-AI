import { gql } from '@apollo/client';

export const ADD_FAVORITE_MUTATION = gql`
  mutation AddFavorite($favItem: String! $email: String!) {
    addFavorite(favItem: $favItem, email: $email) {
      _id
      favItem
    }
  }
`;

export const REMOVE_FAVORITE_MUTATION = gql`
  mutation RemoveFavorite($favoriteId: ID!) {
    removeFavorite(favoriteId: $favoriteId) {
      _id
      favorites
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;