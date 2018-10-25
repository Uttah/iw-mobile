import React, { Component } from 'react';
import PostItem from './PostItem';
import { FlatList, View } from 'react-native';
import { Text, Spinner } from 'native-base';
import styles from './Styles/ProfileTab1Styles';

export default class ProfileTab1 extends Component {

  renderItem = ({ item }) => {
    return (
      <PostItem 
        item={item} 
        onCommentsPress={this.props.onCommentsPress} 
        ownPage={this.props.ownPage}/>
    );
  };

  render() {
    const { loaded, items } = this.props;
    const sorted = items.slice().sort((a:any,b:any) => {
      const f = new Date(a.reposted).getTime() || new Date(a.date).getTime();
      const s = new Date(b.reposted).getTime() || new Date(b.date).getTime();
      return f - s;
    }).reverse();

    if (sorted.length > 0) {
      return (
        <FlatList
          data={sorted}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => { 
            return item.postId + index
          }}
        /> 
      );
    } else if (loaded == true) {
      return (
        <View style={styles.noActivity}>
          <Text>No activity</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.loading}>
          <Spinner/>
        </View>
      );
    }
  }
}