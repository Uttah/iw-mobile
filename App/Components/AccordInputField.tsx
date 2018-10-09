import React, { Component } from 'react';
import InputField from './InputField';
import styles from './Styles/AccordInputFieldStyles';
import { Input } from 'native-base';

type Props = any;

export default class AccordInputField extends Component<Props> {
	
	render() {
		return <InputField {...this.props} style={styles.input}/>;
	}
}