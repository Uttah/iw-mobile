import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import styles from './Styles/CommentItemStyles';

export default class CommentItem extends Component {

  render() {
    const { id, userName, userLogin, content, date } = this.props.item;
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
          <View style={styles.text}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userLogin}>{userLogin}</Text>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}