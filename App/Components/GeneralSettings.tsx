import React, { Component } from 'react';
import { Text, List, ListItem } from 'native-base';
import { View, Platform, Alert, TouchableOpacity } from 'react-native';
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

const renderField = (field) => (
  <Text>{field.input.value}</Text>
);

const renderLanguage = (field) => (
  <Text>{field.input.value == 'en' ? 'English' : 'Russian'}</Text>
);


class GeneralSettings extends Component<Props> {

  componentDidMount() {
    const { email, phone, language } = this.props;
    this.props.dispatch(registerField('general_settings', 'language', 'Field'));
    this.props.initialize({  
      email: (!!email ? email : ''),
      phone: (!!phone ? phone : ''),
      language: (!!language ? language : 'en')
    });
  }
  
  onMenuPress = (value) => {
    this.props.dispatch(change('general_settings', 'language', value == 1 ? 'en' : 'ru'));
  }

  render() {
    const { onPhoneChange, onPasswordChange } = this.props;
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
          <ListItem noIndent button style={styles.listItem} onPress={onPasswordChange}>
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
          <ListItem noIndent button style={styles.listItem} onPress={onPhoneChange}>
            <View style={styles.listItemInner}>
              <Text style={styles.listItemTitle}>Phone</Text>
            </View>
            <View style={styles.listItemInner}>
              <Field name='phone' component={renderField}/>
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
              <Text style={styles.listItemTitle}>Language</Text>
            </View>
            <View style={styles.listItemInner}>
              <Field name='language' component={renderLanguage}/>
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