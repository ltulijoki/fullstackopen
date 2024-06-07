import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import { Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  errortext: {
    color: theme.colors.red,
    fontSize: theme.fontSizes.normal,
    marginLeft: 20,
    fontFamily: theme.fonts.default
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errortext}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;