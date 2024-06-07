import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME }]
  });

  const deleteReview = async id => {
    await mutate({ variables: { reviewId: id } });
  };

  return [deleteReview, result];
};

export default useDeleteReview;