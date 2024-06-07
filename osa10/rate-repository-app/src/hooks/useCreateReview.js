import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const create = async ({ owner, repository, rating, review }) => {
    return await mutate({ variables: { owner, repository, rating, review } });
  };

  return [create, result];
};

export default useCreateReview;