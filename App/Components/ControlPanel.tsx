import React, { Component } from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { Item, Input, Grid, Col } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './Styles/ControlPanelStyles';

export default class ControlPanel extends Component {
  state = {
    showInput: false
  };
  
  onPressClose = () => {
    this.props.onChange({ btn: 'close' });
    this.setState({
      showInput: false
    });
    Keyboard.dismiss();
  }

  onPressInput = () => {
    this.setState({
      showInput: true
    });
  }
  
  render () {
    const {
      onChange,
      searchStr,
      onSearchStrChange,
      searchSubmit
    } = this.props;
    
    return (
      <Item style={styles.panel}>
        <EvilIcons name='search' style={styles.searchIcon} size={20} color={'#999'}/>
        <Input 
          placeholder='Поиск' 
          value = {searchStr}
          style={styles.inputField}
          onChangeText = {onSearchStrChange}
          onKeyPress={this.onPressInput}
          onSubmitEditing={searchSubmit}
          returnKeyType={'done'}
        />
        {this.state.showInput && <TouchableOpacity style={styles.close} onPress={this.onPressClose}>
          <EvilIcons active name='close' size={20} color={'#999'} style={styles.closeIcon}/>
        </TouchableOpacity>}
      </Item>
    );
  }
}