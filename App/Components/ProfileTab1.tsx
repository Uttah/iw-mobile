import React, { Component } from 'react';
import PostItem from './PostItem';
import { FlatList } from 'react-native';
import { Text } from 'native-base';

export default class ProfileTab1 extends Component {

  renderItem = ({ item }) => {
    return (
      <PostItem item={item} onCommentsPress={this.props.onCommentsPress}/>
    );
  };

  render() {
    const { items } = this.props;
    if (items.length > 0) {
      return (
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.postId}
        /> 
      );
    } else {
      return <Text>No activity</Text>;
    }
  }
}