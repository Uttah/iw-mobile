import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/PostItemStyles';
import { Images } from 'App/Themes';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class PostItem extends Component {
	render() {
		return (
      <TouchableOpacity onPress={() => alert('you pressed post!')}>
        <Grid style={styles.topContainer}>
          <Col style={{ width: wp('26%')}}>
            <Image
                source={Images.postImage}
                resizeMode={'contain'}
                style={styles.image}
              />
          </Col>
          <Col style={styles.textCol}>
            <Text style={styles.title}>Как предугадать провал ICO-стартапа?</Text>
            <View style={styles.postStatsContainer}>
              <Text style={[styles.postStats, styles.postLikes]}>100 лайков</Text>
              <Text style={styles.postStats}>Без комментариев</Text>
            </View>
          </Col>
        </Grid>
        <View style={styles.lead}>
          <Text style={styles.leadText}>Откройте инстаграм, и найдите личную страничку основателя стартапа. Если он после ICO купил новый дом, крутой порше, то ...</Text>
        </View>
      </TouchableOpacity>
		);
	}
}