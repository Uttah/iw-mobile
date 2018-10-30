import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { endpoint } from '../Services/Utils';
import { Images } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/InvestorItemStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default class InvestorItem extends Component {
  onInvestorPress = () => {
    const { id } = this.props.item;
    this.props.onPress(id);
  }

  render() {
    const { id, name, login, avatar, countOfFollowers } = this.props.item;
    const avatarSource = !!avatar ? {uri: `${endpoint}/images/${id}/${avatar}`} : Images.noAvatar;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onInvestorPress}>
        <View style={styles.inner}>
          <TouchableHighlight style={styles.avatarWrap}>
            <Image
              source={avatarSource}
              resizeMode={'cover'}
              style={styles.avatar}
            />
          </TouchableHighlight>
          <TouchableOpacity 
            style={styles.button} 
            disabled={false} 
            onPress={this.onInvestorPress}
          >
            <Text uppercase={false} style={styles.buttonText}>Follow</Text>
            <MaterialIcons active name='add-circle-outline' color={'#fff'} size={hp('2.25%')} style={styles.btnicon}/>
          </TouchableOpacity> 
          <Text style={styles.name}>{name}</Text>
          {!!login && login.length > 0 && <Text style={styles.login}>@{login}</Text>}
          <Text style={styles.subscribers}>{countOfFollowers} subscribers</Text>
        </View>
      </TouchableOpacity>
    );
  }
}