import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = id => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: { id, after: data.repository.reviews.pageInfo.endCursor }
    })
  };

  return { repository: data ? data.repository : {}, loading, fetchMore: handleFetchMore };
};

export default useRepository;