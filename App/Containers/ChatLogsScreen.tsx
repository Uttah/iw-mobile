import React, { Component } from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { Container } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import socket from '../Services/Socket';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

const listTop = () => {
  return (
    <View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
      <Text style={styles.headerTitle}>Chat logs</Text>
    </View>
  );
}

const ChatLogs = ({ items }) => {
  return (
    <FlatList
      data={items}
      renderItem={({item}) => {
        return (
          <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>{item.time}</Text>
            <Text>{item.text}</Text>
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={listTop()}
    />
  );
};

export default class ChatLogsScreen extends Component<Props> {
  render() {
    const items = socket.getLogs().slice().reverse();
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <ChatLogs items={items}/>
        </ScrollView>
      </Container>
    );
  }
}