import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { List, ListItem, Left, Right } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles/ProfileTab2Styles';

export default class ProfileTab2 extends Component {
  render() {
    return (
      <List>
        <ListItem button style={styles.listItem} onPress={(e) => alert('you pressed!')}>
          <Left>
            <Text style={styles.title}>Портфолио 1</Text>
          </Left>
          <Right>
            <Ionicons
              name={Platform.OS === "ios" ? 'ios-arrow-forward' : 'md-arrow-forward'} 
              size={hp('3.97%')}
            />
          </Right>
        </ListItem>
        <ListItem button style={styles.listItem} onPress={(e) => alert('you pressed!')}>
          <Left>
            <Text style={styles.title}>Портфолио 2</Text>
          </Left>
          <Right>
            <Ionicons 
              name={Platform.OS === "ios" ? 'ios-arrow-forward' : 'md-arrow-forward'}  
              size={hp('3.97%')}
            />
          </Right>					
        </ListItem>
      </List>
    );
  }
}