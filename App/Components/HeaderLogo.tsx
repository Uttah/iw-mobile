import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './Styles/HeaderLogoStyles';
import { Images } from 'App/Themes';

export default class HeaderLogo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.icoWorldLogo}
          style={styles.logo}
          resizeMode={'contain'}
        />
      </View>
    );
  }
}