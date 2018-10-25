import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { Container, Text } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/NotificationsScreenStyles';
import NotificationItem from '../Components/NotificationItem';
import { Notifications } from '../Services/Enums';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

export default class NotificationsScreen extends Component<Props> {
  onPress = () => {
    console.log('ha');
  }

  renderItem = ({ item }) => {
    return (
      <NotificationItem item={item} onPress={this.onPress}/>
    );
  };

  listTop = () => {
    return (
      <View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
    );
  }

  render() {
    const items = [
      { 
        id: '1', 
        author: 'Stella Johnson', 
        content: 'has recently posted an album', 
        time: '6:19 PM',
        status: Notifications.Like
      },
      { 
        id: '2', 
        author: 'Alex Brown', 
        content: "has shared Martin Guptil's post", 
        time: '8:44 AM',
        status: Notifications.Comment 
      },
      { 
        id: '3', 
        author: 'Domnic Brown', 
        content: "has sent you a group invitation for Global Health", 
        time: '2:23 PM',
        status: Notifications.Join
      },
      { 
        id: '4', 
        author: 'John Smith', 
        content: "has birthday today", 
        time: '5:55 AM',
        status: Notifications.Reply 
      }
    ];
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <FlatList
            data={items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={this.listTop()}
          />
        </ScrollView>
      </Container>
    );
  }
}