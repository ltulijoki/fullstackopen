import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const create = async ({ username, password }) => {
    await mutate({ variables: { username, password } });
  };

  return [create, result];
};

export default useSignUp;