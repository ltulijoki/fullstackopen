import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, search) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: order === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
      orderDirection: order === 'low' ? 'ASC' : 'DESC',
      search
    }
  });

  return { repositories: data ? data.repositories : { edges: [] }, loading };
};

export default useRepositories;