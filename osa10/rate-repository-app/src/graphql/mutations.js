import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const CREATE_REVIEW = gql`
mutation($owner: String!, $repository: String!, $rating: Int!, $review: String) {
  createReview(review: { ownerName: $owner, repositoryName: $repository, rating: $rating, text: $review }) {
    repositoryId
  }
}
`;

export const SIGN_UP = gql`
mutation($username: String!, $password: String!) {
  createUser(user: { username: $username, password: $password }) {
    username
  }
}
`;

export const DELETE_REVIEW = gql`
mutation($reviewId: ID!) {
  deleteReview(id: $reviewId)
}
`;