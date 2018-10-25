import React, { Component } from 'react';
import { Text, List, ListItem } from 'native-base';
import { View, Platform, Alert, TouchableOpacity } from 'react-native';
import styles from './Styles/PrivacySecurityStyles';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import _validate from '../Services/Validator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { change, registerField } from 'redux-form';
import { Switch } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

const validate = values => {
  const error = {};
  error.email = _validate('email', values.email);
  return error;
};

type Props = any;

const renderField = (field) => (
  <Text style={styles.listText}>{field.input.value}</Text>
);

class PrivacySecurity extends Component<Props> {

  componentDidMount() {
    const { pmsenders, commenters, twoFactorAuth } = this.props.user;
    this.props.dispatch(registerField('privacy_security', 'pmsenders', 'Field'));
    this.props.dispatch(registerField('privacy_security', 'commenters', 'Field'));
    this.props.dispatch(registerField('privacy_security', 'twoFactorAuth', 'Field'));
    this.props.initialize({  
      pmsenders: (!!pmsenders ? pmsenders : ''),
      commenters: (!!commenters ? commenters : ''),
      twoFactorAuth: (!!twoFactorAuth ? twoFactorAuth : '')
    });
  }

  renderTwoFactorAuth = (field) => {
    const { dispatch } = this.props;
    return (
      <Switch 
      value={!!field.input.value} 
      tintColor={'#3f51b5'} 
      onTintColor={'#3f51b5'} 
      onValueChange={(val) => dispatch(change('privacy_security', 'twoFactorAuth', val))}/>
    );
  }
  
  onPMSendersPress = (value) => {
    const { dispatch } = this.props;
    dispatch(change('privacy_security', 'pmsenders', value));
  }

  onCommentersPress = (value) => {
    const { dispatch } = this.props;
    dispatch(change('privacy_security', 'commenters', value));
  }

  render() {
    const { phone } = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.subHeaderTitleWrap}>
          <Text style={styles.subHeaderTitle}>Privacy</Text>
        </View>
        <List style={styles.list}>
        <ListItem noIndent style={styles.listItem}>
          <View style={styles.listItemInner}>
            <Text style={styles.listItemTitle}>Who can send me PM?</Text>
          </View>
          <View style={styles.listItemInner}>
            <Field name='pmsenders' component={renderField}/>
          </View>
          <View style={styles.iconWrap}>
            <View style={styles.iconWrapInner}>
              <Menu onSelect={value => this.onPMSendersPress(value)}>
                <MenuTrigger>
                  <MaterialIcons name='edit' size={hp('2.25%')}/>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={'All users'}>
                    <Text style={[styles.menuOption, styles.menuOptionFirst]}>All users</Text>
                  </MenuOption>
                  <MenuOption value={'Only verified'}>
                    <Text style={styles.menuOption}>Only verified</Text>
                  </MenuOption>
                  <MenuOption value={'Only my follows'}>
                    <Text style={styles.menuOption}>Only my follows</Text>
                  </MenuOption>
                  <MenuOption value={'Nobody'}>
                    <Text style={styles.menuOption}>Nobody</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu> 
            </View>
          </View>
        </ListItem>
        <ListItem noIndent style={styles.listItem}>
          <View style={styles.listItemInner}>
            <Text style={styles.listItemTitle}>Who can comment my posts?</Text>
          </View>
          <View style={styles.listItemInner}>
            <Field name='commenters' component={renderField}/>
          </View>
          <View style={styles.iconWrap}>
            <View style={styles.iconWrapInner}>
              <Menu onSelect={value => this.onCommentersPress(value)}>
                <MenuTrigger>
                  <MaterialIcons name='edit' size={hp('2.25%')}/>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={'All'}>
                    <Text style={[styles.menuOption, styles.menuOptionFirst]}>All</Text>
                  </MenuOption>
                  <MenuOption value={'Only verified'}>
                    <Text style={styles.menuOption}>Only verified</Text>
                  </MenuOption>
                  <MenuOption value={'Only my follows'}>
                    <Text style={styles.menuOption}>Only my follows</Text>
                  </MenuOption>
                  <MenuOption value={'Nobody'}>
                    <Text style={styles.menuOption}>Nobody</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu> 
            </View>
          </View>
        </ListItem>
        </List>
        <View style={styles.subHeaderTitleWrap}>
          <Text style={styles.subHeaderTitle}>Security</Text>
        </View>
        <List style={styles.list}>
          <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Last activity</Text>
            </View>
            <View style={styles.listItemInner}>
              <Text style={styles.listText}>15:20, Today (Russia, Google Chrome browser)</Text>
            </View>
          </ListItem>
          {phone.length > 0 && <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Two-factor authentication</Text>
            </View>
            <View style={styles.listItemInner}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Field name='twoFactorAuth' component={this.renderTwoFactorAuth}/>
                <View>
                  <Text style={[styles.listText, styles.switchText]}>by number {phone}</Text>
                </View>
              </View>
            </View>
          </ListItem>}
        </List>
      </View>
    );
  }
}

export default reduxForm({
  form: 'privacy_security',
  validate
})(PrivacySecurity);