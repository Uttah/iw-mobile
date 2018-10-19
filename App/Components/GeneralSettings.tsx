import React, { Component } from 'react';
import { Text, List, ListItem } from 'native-base';
import { View, Platform, Alert } from 'react-native';
import styles from './Styles/GeneralSettingsStyles';
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

const validate = values => {
  const error = {};
  error.email = _validate('email', values.email);
  return error;
};

type Props = any;

class GeneralSettings extends Component<Props> {
  state = {
    language: 'en'
  }

  componentDidMount() {
    const { email, phone } = this.props;
    this.props.dispatch(registerField('general_settings', 'language', 'Field'));
    this.props.initialize({  
      email: (!!email ? email : ''), 
      phone: (!!phone ? phone : '')
    });
  }

  onMenuPress = (value) => {
    this.props.dispatch(change('general_settings', 'language', value == 1 ? 'en' : 'ru'));
    this.setState({
      language: value == 1 ? 'en' : 'ru'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Email address</Text>
            </View>
            <Field 
              name='email'
              component={InputField} 
              style={styles.input}
              placeholder='Email'
              showError={true}
            />
          </ListItem>
          <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Password</Text>
            </View>
            <View style={styles.listItemInner}>
              <Text>Changed 7 months ago</Text>
            </View>
            <View style={styles.iconWrap}>
              <View style={styles.iconWrapInner}>
                <Ionicons
                  name={Platform.OS === "ios" ? 'ios-arrow-forward' : 'md-arrow-forward'} 
                  size={hp('2.25%')}
                  style={Platform.OS === "ios" ? styles.iosLeftMargin : styles.androidLeftMargin}
                />
              </View>
            </View>
          </ListItem>
          <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Phone number</Text>
            </View>
            <Field 
              name='phone'
              component={InputField} 
              style={styles.input}
              placeholder='Phone'
              showError={true}
            />
          </ListItem>
          <ListItem noIndent style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Language</Text>
            </View>
            <View style={styles.listItemInner}>
              <Text>{this.state.language == 'en' ? 'English' : 'Russian'}</Text>
            </View>
            <View style={styles.iconWrap}>
              <View style={styles.iconWrapInner}>
                <Menu onSelect={value => this.onMenuPress(value)}>
                  <MenuTrigger style={styles.menu}>
                    <MaterialIcons name='edit' style={styles.edit} size={hp('2.25%')}/>
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption value={1}>
                      <Text style={[styles.menuOption, styles.menuOptionFirst]}>English</Text>
                    </MenuOption>
                    <MenuOption value={2}>
                      <Text style={styles.menuOption}>Russian</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu> 
              </View>
            </View>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default reduxForm({
  form: 'general_settings',
  validate
})(GeneralSettings);