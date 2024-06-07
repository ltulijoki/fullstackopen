import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate('/');
    };
    signOut();
  }, []);

  return <View />;
};

export default SignOut;