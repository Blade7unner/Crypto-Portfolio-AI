import { gql } from '@apollo/client';

export const ADD_FAVORITE_MUTATION = gql`
  mutation AddFavorite($stockName: String!) {
    addFavorite(stockName: $stockName) {
      favorites
    }
  }
`;

export const REMOVE_FAVORITE_MUTATION = gql`
  mutation RemoveFavorite($stockName: String!) {
    removeFavorite(stockName: $stockName) {
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