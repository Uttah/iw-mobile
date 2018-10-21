import React, { Component } from 'react';
import { TouchableHighlight, Image, View } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import { Col, Grid } from 'react-native-easy-grid';
import MessagesNum from '../Components/MessagesNum';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/AuthorStyles';

type Props = {
  style: any,
  author: string,
  authorNameStyle: string,
  date: string,
  messagesNum: number
};

export default class Author extends Component<Props> {
  static defaultProps: {
    style: {},
    authorNameStyle: {},
    messagesNum: 0
  };

  render() {
    const { style, author, authorNameStyle, messagesNum } = this.props;
    return (
      <Grid style={[styles.bottomContainer, style]}>
        <Col style={{ width: wp('9.07%')}}>
          <TouchableHighlight style={styles.postAuthorAvatarWrap}>
            <View>
              <Image
                source={Images.noAvatar}
                resizeMode={'contain'}
                style={styles.postAuthorAvatar}
              /> 
              { messagesNum > 0 && <MessagesNum messagesNum={messagesNum} style={styles.messagesNum}/>}   
            </View>          
          </TouchableHighlight>
        </Col>
        <Col style={styles.authorNameCol}>
          <Text style={[styles.postAuthor, authorNameStyle]}>{author}</Text>
        </Col>
      </Grid>
    );
  }
}