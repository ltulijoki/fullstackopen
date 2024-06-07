import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $search: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $search) {
    edges {
      node {
        id
        ownerAvatarUrl
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        ownerName
        name
      }
    }
  }
}
`;

// other queries...

export const ME = gql`
query {
  me {
    id
    username
    reviews {
      edges {
        node {
          id
          repository {
            ownerName
            name
            fullName
            id
          }
          text
          rating
          createdAt
          user {
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query($id: ID!, $after: String) {
  repository(id: $id) {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
    reviews(first: 3, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;