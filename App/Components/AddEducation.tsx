import React, { Component } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import styles from './Styles/AddEducationStyles';
import { Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import _validate from '../Services/Validator';
import DateInputField from './DateInputField';

const validate = values => {
	const error = {};
  error.email = _validate('email', values.email);
	error.name = _validate('name', values.name);
	return error;
};

type Props = any;

class AddEducation extends Component<Props> {
	static defaultProps: {
		edit: false
	};

	componentDidMount() {
		const { edit } = this.props;
		if (edit) {
			const { name, from, to } = this.props.education;
			this.props.initialize({  
				name: (!!name ? name : ''), 
				from: (!!from ? new Date(from) : ''), 
				to: (!!to ? new Date(to) : ''), 
			});
		}
	}

	render() {
		const { onSave } = this.props;
		return (
			<View style={styles.container}>
				<Field 
					name='name'
					component={InputField} 
					style={styles.input}
					placeholder='Your education'
					showError={true}
				/>
				<Field 
					name='from' 
					component={DateInputField} 
					style={styles.input}
					placeholder='From'
					showError={true}
				/>
				<Field 
					name='to' 
					component={DateInputField} 
					style={styles.input}
					placeholder='To'
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
  form: 'add_education',
  validate
})(AddEducation);