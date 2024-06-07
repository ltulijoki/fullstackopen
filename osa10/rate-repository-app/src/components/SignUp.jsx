import { Formik } from 'formik';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
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
    .required('Username is required')
    .max(30, 'Username\'s length must be less than 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password\'s length must be more than 5')
    .max(50, 'Password\'s length must be less than 50'),
  conf: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Password and password confirmation must be same')
});

export const Form = ({ onSubmit }) => (
  <Formik initialValues={{ username: '', password: '', conf: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="conf" placeholder="Password confirmation" secureTextEntry />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
    }
  </Formik>
);

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
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

export default SignUp;