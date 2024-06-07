import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingRight: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: theme.fontSizes.normal,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.default
  },
  tab: {
    alignSelf: 'center',
    paddingHorizontal: 10
  }
});

const AppBarTab = ({ text, to }) => {
  const navigate = useNavigate();

  return (
    <Pressable style={styles.tab} onPress={() => navigate(to)}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { me } = useMe();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" to="/" />
        {me
          ? <>
            <AppBarTab text="Create a review" to="/createreview" />
            <AppBarTab text="My reviews" to="/myreviews" />
            <AppBarTab text="Sign Out" to="/signout" />
          </>
          : <>
            <AppBarTab text="Sign In" to="/signin" />
            <AppBarTab text="Sign Up" to="/signup" />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;