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
  //а как проверять что пароли не совпадают?
  //вешаем ошибку например на новый пароль
  // error.email = _validate('email', values.email);
	// error.name = _validate('name', values.name);
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