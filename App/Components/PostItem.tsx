import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/PostItemStyles';
import { Images } from 'App/Themes';
import { Col, Grid } from 'react-native-easy-grid';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SocialStats from './SocialStats';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { endpoint } from '../Services/Utils';

export default class PostItem extends Component {
  onMenuPress = (value, id) => {
    alert('you pressed!');
  }
  
  render() {
    const { userName, userLogin, content, edited, avatar, userId } = this.props.item;
    const imageSource = !!avatar ? {uri: `${endpoint}/images/${userId}/${avatar}`} : Images.noAvatar;
    
    return (
      <TouchableOpacity style={styles.post} onPress={() => alert('you pressed post!')}>
        <Grid style={styles.topContainer}>
          <Col style={{ width: wp('11%'), paddingLeft: wp('3.3%')}}>
            <TouchableHighlight style={styles.postAuthorAvatarWrap}>
              <Image
                source={imageSource}
                resizeMode={'cover'}
                style={styles.postAuthorAvatar}
              />              
            </TouchableHighlight>
          </Col>
          <Col style={styles.textCol}>
            <Text style={styles.title}>{userName}</Text>
            {!!userLogin && userLogin.length > 0 && <Text style={styles.postAuthor}>@{userLogin}</Text>}
          </Col>
        </Grid>
        <View style={styles.lead}>
          <Text style={styles.leadText}>{content}</Text>
        </View>
        <View style={styles.postStatsContainer}>
          <SocialStats likes={1} comments={2} shares={3} onCommentsPress={this.props.onCommentsPress}/>
        </View>
        <Menu onSelect={value => this.onMenuPress(value, 1)} style={styles.button}>
          <MenuTrigger>
            <Entypo name='dots-three-vertical' style={styles.dots} size={hp('2.4%')} color={'#ccc'}/>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text style={[styles.menuOption, styles.menuOptionFirst]}>Закрепить</Text>
            </MenuOption>
            <MenuOption value={2}>
              <Text style={styles.menuOption}>Редактировать</Text>
            </MenuOption>
            <MenuOption value={3}>
              <Text style={styles.menuOption}>Удалить</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    );
  }
}