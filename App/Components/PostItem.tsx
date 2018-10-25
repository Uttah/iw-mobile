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
    const { userName, userLogin, content, edited, avatar, userId, likes, comments } = this.props.item;
    const imageSource = !!avatar ? {uri: `${endpoint}/images/${userId}/${avatar}`} : Images.noAvatar;
    const options = this.props.ownPage ? [
      { value: 1, text: 'Pin to top' },
      { value: 2, text: 'Edit' },
      { value: 3, text: 'Delete' } 
    ] : 
    [
      { value: 1, text: 'Complain' }
    ];

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
          <SocialStats likes={likes ? likes.length : 0} comments={comments ? comments.length : 0} shares={1} onCommentsPress={this.props.onCommentsPress}/>
        </View>
        <View style={styles.edited}>
          <Text style={styles.postAuthor}>{new Date(edited).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        </View>
        <Menu onSelect={value => this.onMenuPress(value, 1)} style={styles.button}>
          <MenuTrigger>
            <Entypo name='dots-three-vertical' style={styles.dots} size={hp('2.4%')} color={'#ccc'}/>
          </MenuTrigger>
          <MenuOptions>
            {options.map((option, index) => 
              <MenuOption value={option.value} key={index}>
                <Text style={[styles.menuOption, index == 0 ? styles.menuOptionFirst : null]}>{option.text}</Text>
              </MenuOption>
            )}
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    );
  }
}