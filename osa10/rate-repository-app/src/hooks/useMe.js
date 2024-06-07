import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });

  return { me: data ? data.me : null, loading };
};

export default useMe;