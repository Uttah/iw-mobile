import React, { Component } from 'react';
import PostItem from './PostItem';
import { FlatList } from 'react-native';

export default class ProfileTab1 extends Component {

  renderItem = ({ item }) => {
    return (
      <PostItem item={item} onCommentsPress={this.props.onCommentsPress}/>
    );
  };

  render() {
    const { items } = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }
}