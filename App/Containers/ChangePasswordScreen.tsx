import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/ChangePhoneScreenStyles';
import ChangePassword from '../Components/ChangePassword';
import { change } from 'redux-form';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class ChangePasswordScreen extends Component<Props> {
  onSave = () => {
    const { navigation, dispatch, change_password } = this.props;
    !!change_password && dispatch(change('general_settings', 'password', change_password.newPassword));
    navigation.goBack();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Change password</Text>
        <ChangePassword onSave={this.onSave}/>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({form}:any) => {
  return {
    general_settings: form.general_settings ? form.general_settings.values : {},
    change_password: form.change_password ? form.change_password.values : {}
  }
};


export default connect(mapStateToProps)(ChangePasswordScreen);