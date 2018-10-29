import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';
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
import AutoHeightImage from 'react-native-auto-height-image';
import HTML from 'react-native-render-html';

export default class PostItem extends Component {

  onMenuPress = (value, id) => {
    alert('you pressed!');
  }

  postWithTagsReplacer = (text: string, tags: Array<string>) => {
    let replaceredText = text;

    tags.forEach(function(item) {
      let pattern = new RegExp('(' + item + ')', 'g')
      let elem = `<span class="tag">$1</span>`
      replaceredText = replaceredText.replace(pattern, elem)
    })

    replaceredText = this.postReplacer(replaceredText);

    return (
        replaceredText
    )
}

  postReplacer = (text: string) => {
    let replaceredText = text;

    let linksRegExp = /(https?:\/\/[\w\/?.&-=]+)/g;
    let newParagraphRegExp = new RegExp('\n', 'g')

    if(linksRegExp.test(replaceredText)) {
      replaceredText = replaceredText.replace(linksRegExp, `<a href="$1">$1</a>`);
    }

    if(newParagraphRegExp.test(replaceredText)) {
      replaceredText = replaceredText.replace(newParagraphRegExp, `</br>`);
    }

    return (
      replaceredText
    )
  }

  onLinkPress = (href, obj) => {
    Linking.openURL(obj).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { 
      userName, 
      userLogin, 
      content, 
      edited, 
      avatar, 
      userId, 
      likes, 
      comments, 
      __typename,
      attachments,
      tags
    } = this.props.item;
    
    const avatarSource = !!avatar ? {uri: `${endpoint}/images/${userId}/${avatar}`} : Images.noAvatar;
    const options = this.props.ownPage ? [
      { value: 1, text: 'Pin to top' },
      { value: 2, text: 'Edit' },
      { value: 3, text: 'Delete' } 
    ] : 
    [
      { value: 1, text: 'Complain' }
    ];
    const date = new Date(edited).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const repost = __typename === 'Repost' ? '*' + __typename : '';
    const postContent = tags.length > 0 ? this.postWithTagsReplacer(content, tags) : this.postReplacer(content);

    return (
      <TouchableOpacity style={styles.post} onPress={() => alert('you pressed post!')}>
        <Grid style={styles.topContainer}>
          <Col style={{ width: wp('14.3%') + 2, paddingLeft: wp('3.3%')}}>
            <TouchableHighlight style={styles.postAuthorAvatarWrap}>
              <Image
                source={avatarSource}
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
        {attachments && attachments.length > 0 && attachments.map((attachment) =>
          <View style={styles.postImage} key={attachment}>
            <AutoHeightImage
              width={wp('90%')}
              source={{ uri: `${endpoint}/images/${userId}/${attachment}` }}
            />
          </View> 
        )}
        <View style={styles.lead}>
        <HTML 
          html={postContent}
          baseFontStyle={{ fontSize: wp('4%'), color: '#47525E' }}
          classesStyles={{'tag': { color: '#4a86e8' }}}
          onLinkPress={this.onLinkPress}
        />
        </View>
        <View style={styles.postStatsContainer}>
          <SocialStats likes={likes ? likes.length : 0} comments={comments ? comments.length : 0} shares={1} onCommentsPress={this.props.onCommentsPress}/>
        </View>
        <View style={styles.edited}>
          <Text style={styles.postAuthor}>
            {`${date} ${repost}`}
          </Text>
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