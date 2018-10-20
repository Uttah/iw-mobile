import React, { Component } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import styles from './Styles/AddExperienceStyles';
import { Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import _validate from '../Services/Validator';

const validate = values => {
const error = {};
error.phone = _validate('phone', values.phone);
error.code = _validate('code', values.code);
return error;
};

// const validate = values => {
//   const errors = {}
//   if (!values.phone) {
//     errors.phone = 'Required'
//   } else if (!/^[0-9]{10}$/i.test(values.phone)) {
//     errors.phone = 'Must have 10 digits'
//   }
//   if (!values.code) {
//     errors.code = 'Required'
//   } else if (!/^[0-9]{10}$/i.test(values.code)) {
//     errors.code = 'Must have 10 digits'
//   }
//   return errors
// }

type Props = any;

class ChangePhone extends Component<Props> {
  state = {
    isSMSVisible: false,
    canSubmit: false
  };

  onSave = () => {
    const { isSMSVisible } = this.state;
    if (isSMSVisible) {
      this.props.onSave();
    } else {
    this.setState({
      isSMSVisible: true
    });
    }
  }

  render() {
    const { onSave } = this.props;
    const { isSMSVisible } = this.state;
    return (
      <View style={styles.container}>
        <Field 
          name='phone'
          component={InputField} 
          style={styles.input}
          placeholder='Enter your new phone number'
          showError={true}
        />
        {this.state.isSMSVisible && <Field 
          name='code'
          component={InputField} 
          style={styles.input}
          placeholder='Enter SMS code'
          showError={true}
        />}
        <Button block primary onPress={this.onSave}>
          <Text>{isSMSVisible ? 'Verify' : 'Change'}</Text>
        </Button>
      </View>
    );
  }
}

export default reduxForm({
form: 'change_phone',
validate
})(ChangePhone);