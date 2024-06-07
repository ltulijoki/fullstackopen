import { Image, StyleSheet, Text, View, Dimensions, Pressable, FlatList, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import * as Linking from 'expo-linking';
import format from 'date-fns/format';
import useDeleteReview from '../hooks/useDeleteReview';

const replaceThousandsWithK = number => {
  if (number < 1000) return number;

  const rounded = Math.round(number / 100) / 10;
  return rounded.toString() + 'k';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
    display: 'flex'
  },
  text: {
    fontSize: theme.fontSizes.normal,
    alignSelf: 'flex-start',
    fontFamily: theme.fonts.default
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    flexGrow: 0
  },
  about: {
    marginLeft: 30,
    marginBottom: 30,
    width: Dimensions.get('window').width - 80
  },
  language: {
    backgroundColor: theme.colors.blue,
    borderRadius: 5,
    color: theme.colors.white,
    padding: 3
  },
  aboutAndImage: {
    display: 'flex',
    flexDirection: 'row'
  },
  secondary: {
    color: theme.colors.secondaryColor
  },
  datas: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  data: {
    alignSelf: 'center'
  },
  githubButton: {
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
  },
  separator: {
    height: 10
  },
  number: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.blue,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center'
  },
  numberText: {
    textAlign: 'center',
    color: theme.colors.blue,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.normal
  },
  reviewAbout: {
    marginLeft: 30,
    marginBottom: 30,
    width: Dimensions.get('window').width - 85
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  smallButton: {
    padding: 20,
    borderRadius: 5
  },
  sbText: {
    fontSize: theme.fontSizes.normal,
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.default
  },
  bgBlue: {
    backgroundColor: theme.colors.blue
  },
  bgRed: {
    backgroundColor: theme.colors.red
  }
});

const About = ({ item }) => (
  <View style={styles.about}>
    <Text style={[styles.text, styles.fontWeightBold]}>{item.fullName}</Text>
    <Text style={[styles.text, styles.secondary]}>{item.description}</Text>
    <Text style={[styles.text, styles.language]}>{item.language}</Text>
  </View>
);

const Data = ({ data, text }) => (
  <View>
    <Text style={[styles.text, styles.fontWeightBold, styles.data]}>{data}</Text>
    <Text style={[styles.text, styles.secondary, styles.data]}>{text}</Text>
  </View>
);

const RepositoryInfo = ({ item, moreInfo }) => {
  const navigate = useNavigate();

  return (
    <View>
      <View testID="repositoryItem" style={styles.container}>
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <View style={styles.aboutAndImage}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
            <About item={item} />
          </View>
          <View style={styles.datas}>
            <Data data={replaceThousandsWithK(item.stargazersCount)} text="Stars" />
            <Data data={replaceThousandsWithK(item.forksCount)} text="Forks" />
            <Data data={item.reviewCount} text="Reviews" />
            <Data data={item.ratingAverage} text="Rating" />
          </View>
          {moreInfo && <Pressable style={styles.githubButton} onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </Pressable>}
        </Pressable>
      </View>
      <Separator />
    </View>
  );
};

export const ReviewItem = ({ review, showRepository, moreInfo }) => {
  const navigate = useNavigate();
  const [deleteFunc] = useDeleteReview();

  const viewRepository = () => {
    navigate(`/repositories/${review.repository.id}`);
  };

  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => await deleteFunc(review.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.aboutAndImage}>
        <View style={styles.number}>
          <Text style={styles.numberText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewAbout}>
          <Text style={[styles.text, styles.fontWeightBold]}>
            {showRepository ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={[styles.text, styles.secondary]}>{format(Date.parse(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {moreInfo && <View style={styles.buttons}>
        <Pressable style={[styles.smallButton, styles.bgBlue]} onPress={viewRepository}>
          <Text style={styles.sbText}>View repository</Text>
        </Pressable>
        <Pressable style={[styles.smallButton, styles.bgRed]} onPress={deleteReview}>
          <Text style={styles.sbText}>Delete review</Text>
        </Pressable>
      </View>}
    </View>
  )
}

const Separator = () => <View style={styles.separator} />

const RepositoryItem = ({ item, moreInfo, fetchMore }) => {
  if (!item) return;
  const reviews = item.reviews && moreInfo ? item.reviews.edges.map(r => r.node) : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo item={item} moreInfo={moreInfo} />}
      ItemSeparatorComponent={Separator}
      onEndReached={fetchMore}
    />
  )
};

export default RepositoryItem;