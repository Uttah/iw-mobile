import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from './Styles/DateInputFieldStyles';

type Props = any;

export default class InputField extends Component<Props> {
	
	render() {
		const { input, style, placeholder } = this.props;
		
		return (
			<View style={style}>
				<View style={styles.container}>
					<DatePicker
						date={input.value}
						mode='date'
						placeholder={placeholder}
						format='DD MMM YYYY'
						minDate='1900-01-01'
						maxDate='2099-01-01'
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36,
								borderWidth: 0,
								alignItems: 'flex-start'
							},
							placeholderText: {
								color: '#575757'
							}
						}}
						onDateChange={(date) => {input.onChange(date)}}
					/>
				</View>
			</View>
		);
	}
}