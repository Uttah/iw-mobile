import React, { Component } from 'react';
import { View } from 'react-native';
import { Label, Textarea } from 'native-base';
import styles from './Styles/TextareaFieldStyles';

type Props = any;

export default class TextareaField extends Component<Props> {
	
	render() {
		const { input, label, type, meta: { touched, error, warning }, style, placeholder, showError } = this.props;

		let hasError = false;
    if (error !== undefined){
      hasError = true;
    }
		
		return (
			<View style={style}>
				<Textarea rowSpan={5} bordered {...input} placeholder={placeholder} style={styles.input}/>
				{showError && hasError && input.value.length && <Label style={styles.errorLabel}>{error}</Label>}
			</View>
		);
	}
}

