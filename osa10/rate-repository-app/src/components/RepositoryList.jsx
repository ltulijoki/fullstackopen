import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Menu = ({ value, setValue }) => {
  return (
    <View>
      <Picker
        selectedValue={value}
        onValueChange={setValue}
        prompt="Select an item..."
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="high" />
        <Picker.Item label="Lowest rated repositories" value="low" />
      </Picker>
    </View>
  );
};

const Search = ({ search, setSearch }) => {
  return (
    <Searchbar placeholder="Search repositories" onChangeText={setSearch} value={search} />
  );
};

const Header = ({ order, setOrder, search, setSearch }) => {
  return (
    <View>
      <Search search={search} setSearch={setSearch} />
      <Menu value={order} setValue={setOrder} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { order, setOrder, search, setSearch } = this.props;
    return (
      <Header order={order} setOrder={setOrder} search={search} setSearch={setSearch} />
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [search, setSearch] = useState('');
  const { repositories } = useRepositories(order, search);

  return <RepositoryListContainer
    repositories={repositories}
    order={order}
    setOrder={setOrder}
    search={search}
    setSearch={setSearch}
  />;
};

export default RepositoryList;