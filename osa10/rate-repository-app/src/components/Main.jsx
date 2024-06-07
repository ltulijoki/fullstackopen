import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes, useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import RepositoryItem from './RepositoryItem';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  }
});

const RepositoryPage = () => {
  const id = useParams().id;
  const { repository, fetchMore } = useRepository(id);

  return <RepositoryItem item={repository} moreInfo fetchMore={fetchMore} />;
};

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/repositories/:id" element={<RepositoryPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main