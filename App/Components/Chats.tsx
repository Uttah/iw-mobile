import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import styles from './Styles/ChatsStyles';
import MessageItem from '../Components/MessageItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ControlPanel from '../Components/ControlPanel';

export default class Chats extends Component {
  state = {
    filterStr: '',
    searchPressed: false
  };

  onSearchStrChange = (text) => {
    this.setState({
      filterStr: text,
      searchPressed: false
    });
  }
  
  toggleSearch = () => {
    this.setState({
      filterStr: '',
      searchPressed: false
    });
  }
  
  searchSubmit = () => {
    this.setState({
      searchPressed: true
    });
  }
  
  listTop = () => {
    //высоты подбить
    return (
      <View style={{ height: hp('17%'), flex: 1 }}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{height: hp('7.27%'), position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <ControlPanel 
            onChange={this.toggleSearch}
            searchStr={this.state.filterStr}
            onSearchStrChange={this.onSearchStrChange}
            searchSubmit={this.searchSubmit}
          />
        </View>
      </View>
    );
  }

  render() {
    const { items, onMessagePress } = this.props;
    const { filterStr, searchPressed } = this.state;
    const filteredItems = searchPressed && filterStr.length ? 
      items.filter((chat:any) => chat.parnter.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1) :
      items;
    return (
      <FlatList
        data={filteredItems}
        renderItem={({item}) => {
          return (
            <MessageItem item={item} onMessagePress={() => onMessagePress(item.chatId, item.parnter.id, item.parnter.name)}/>
          );
        }}
        keyExtractor={(item) => item.chatId}
        ListHeaderComponent={this.listTop()}
      />
    );
  }
}