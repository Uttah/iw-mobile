import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import { MaterialIcons, FontAwesome, Foundation } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/NotificationItemStyles';
import { Notifications } from '../Services/Enums';

export default class NotificationItem extends Component {
  btnIcon = (status, onPress) => {
    if (status == Notifications.Comment) {
      return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <MaterialIcons active name='comment' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
          <Text style={styles.btntext}>Comment</Text>
        </TouchableOpacity>
      );
    } else if (status == Notifications.Join) {
      return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <MaterialIcons active name='group-add' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
          <Text style={styles.btntext}>Join</Text>
        </TouchableOpacity>
      );
    } else if (status == Notifications.Like) {
      return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Foundation active name='like' color={'#5A6978'} size={hp('2.25%')} style={[styles.btnicon, styles.iconlike]}/>
          <Text style={styles.btntext}>Like</Text>
        </TouchableOpacity>
      );
    } else if (status == Notifications.Reply) {
      return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <FontAwesome active name='reply' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
          <Text style={styles.btntext}>Reply</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { id, author, content, time, status } = this.props.item;
    const onPress = this.props.onPress;

    return (
      <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
          <TouchableHighlight style={styles.avatarWrap}>
            <View>
              <Image
                source={Images.noAvatar}
                resizeMode={'contain'}
                style={styles.avatar}
              /> 
            </View>          
          </TouchableHighlight>
          <View style={styles.content}>
            <Text style={styles.text}>{author} {content}</Text>
            {this.btnIcon(status, onPress)}
          </View>
          <View style={styles.time}><Text style={styles.timeText}>{time}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }
}