import { FlatList, StyleSheet, View } from 'react-native';
import useMe from '../hooks/useMe';
import { ReviewItem } from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const Separator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me } = useMe();

  if (!me) return;

  return (
    <FlatList
      data={me.reviews.edges.map(r => r.node)}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => <ReviewItem review={item} showRepository moreInfo />}
    />
  );
};

export default MyReviews;