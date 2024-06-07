import { Formik } from 'formik';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
  button: {
    margin: 20,
    padding: 20,
    borderColor: theme.colors.secondaryColor,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.blue
  },
  buttonText: {
    fontSize: theme.fontSizes.normal,
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.default
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

export const Form = ({ onSubmit }) => (
  <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
    }
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={onSubmit} />
  );
};

export default SignIn;