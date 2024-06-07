import { Formik } from 'formik';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import useMe from '../hooks/useMe';
import useRepositories from '../hooks/useRepositories';

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
  owner: yup
    .string()
    .required('Repository owner name is required'),
  repository: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating should be at least 0')
    .max(100, 'Rating should be up to 100'),
  review: yup
    .string()
    .optional()
});

export const Form = ({ onSubmit }) => (
  <Formik
    initialValues={{ owner: '', repository: '', rating: '', review: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <View style={styles.container}>
      <FormikTextInput name="owner" placeholder="Repository owner name" />
      <FormikTextInput name="repository" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
    }
  </Formik>
);

const CreateReview = () => {
  const [create] = useCreateReview();
  const navigate = useNavigate();
  const { me } = useMe();
  const { repositories } = useRepositories();

  const onSubmit = async (values) => {
    const { owner, repository, rating, review } = values;

    if (!repositories.edges.map(r => r.node).find(r => r.name === repository && r.ownerName === owner)) {
      Alert.alert('Repository doesn\'t exists');
      return;
    }

    if (me.reviews.edges.map(r => r.node.repository).find(r => r.name === repository && r.ownerName === owner)) {
      Alert.alert('You have already reviewed this repository');
      return;
    }

    try {
      const { data } = await create({ owner, repository, rating: Number(rating), review });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={onSubmit} />
  );
};

export default CreateReview;