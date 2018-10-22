import React, { Component } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import styles from './Styles/ChangePasswordStyles';
import { Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import _validate from '../Services/Validator';

const validate = values => {
  const error = {};
  const repeatNewPassword = !!values.repeatNewPassword ? values.repeatNewPassword : '';
  const newPassword = !!values.newPassword ? values.newPassword : '';

  if (repeatNewPassword.length >= newPassword.length && newPassword != repeatNewPassword) {
    error.repeatNewPassword= "passwords don't match";
  }
  return error;
};

type Props = any;

class ChangePassword extends Component<Props> {

  render() {
    const { onSave } = this.props;
    return (
      <View style={styles.container}>
        <Field 
          name='oldPassword'
          component={InputField} 
          style={styles.input}
          placeholder='Enter old password'
          showError={true}
        />
        <Field 
          name='newPassword' 
          component={InputField} 
          style={styles.input}
          placeholder='Enter new password'
          showError={true}
        />
        <Field 
          name='repeatNewPassword' 
          component={InputField} 
          style={styles.input}
          placeholder='Repeat new password'
          showError={true}
        />
        <Button block primary onPress= {onSave}>
          <Text>Save</Text>
        </Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'change_password',
  validate
})(ChangePassword);