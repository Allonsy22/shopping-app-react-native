import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ItemCard } from '../components';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const keyExtractor = ({ id }) => id;

class CardListScreen extends React.Component {
  componentDidMount() {
    this.setHeaderTitle();
    this.initItems();
  };

  setHeaderTitle() {
    const { navigation, route } = this.props;
    navigation.setOptions({ title: route.params.title });
  };

  initItems() {
    const { route, initCategoryItemsData } = this.props;
    initCategoryItemsData(route.params.id);
  };

  renderItem = ({ item }) => {
    return (
      <ItemCard
        {...item}
      />
    );
  }

  render() {
    const { items } = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        style={styles.container}
      />
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 15,
  }
});

const mapStateToProps = state => {
  return {
    items: state.categories.categoryItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCategoryItemsData: (categoryId) => dispatch(actions.initCategoryItemsData(categoryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardListScreen);