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

export default class PostItem extends Component {
  onMenuPress = (value, id) => {
    alert('you pressed!');
  }
  
  render() {
    return (
      <TouchableOpacity style={styles.post} onPress={() => alert('you pressed post!')}>
        <Grid style={styles.topContainer}>
          <Col style={{ width: wp('26%'), justifyContent: 'center' }}>
            <Image
              source={Images.postImage}
              resizeMode={'contain'}
              style={styles.image}
            />
          </Col>
          <Col style={styles.textCol}>
            <Text style={styles.title}>Как предугадать провал ICO-стартапа?</Text>
            <View style={styles.postStatsContainer}>
              <SocialStats likes={1} comments={2} shares={3} onCommentsPress={this.props.onCommentsPress}/>
            </View>
          </Col>
        </Grid>
        <View style={styles.lead}>
          <Text style={styles.leadText}>Откройте инстаграм, и найдите личную страничку основателя стартапа. Если он после ICO купил новый дом, крутой порше, то ...</Text>
        </View>
        <Grid style={styles.bottomContainer}>
          <Col style={{ width: wp('9.07%')}}>
            <TouchableHighlight style={styles.postAuthorAvatarWrap}>
              <Image
                source={Images.noAvatar}
                resizeMode={'contain'}
                style={styles.postAuthorAvatar}
              />              
            </TouchableHighlight>
          </Col>
          <Col>
            <Text style={styles.postAuthor}>Владислава Константиновна Карамагомедовна-ФазыльОглы 2 недели назад</Text>
          </Col>
        </Grid>
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