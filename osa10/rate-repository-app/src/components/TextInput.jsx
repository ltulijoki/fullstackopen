import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme'

const styles = StyleSheet.create({
  input: {
    margin: 20,
    padding: 20,
    borderColor: theme.colors.secondaryColor,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: theme.fontSizes.normal,
    fontFamily: theme.fonts.default
  },
  error: {
    borderColor: theme.colors.red
  }
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;