import React, { Component } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import styles from './Styles/PoolAddStyles';
import { Button, Text } from 'native-base';
import validate from '../Services/Validator';
import TextField from './TextField';
import { TextFieldStatus } from '../Services/Enums';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import DatePicker from 'react-native-datepicker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const platform = Platform.OS;

type Props = {
	style: any,
	input: any
};

type State = {
	input: {
		projectName: string,
		projectLink: string,
		projectAdress: string,
		poolSoftCap: number,
		poolHardCap: number,
		minDeposit: number,
		maxDeposit: number,
		endDate: string,
		comissionOfHolder: number,
		addressForComissionPayment: string,
		comissionOfIcoWorld: number,
	}
}

// type State = {
// 	poolName: string,
// 	owner: string,
// 	projectName: string,
// 	projectLink: string,
// 	projectAdress: string,
// 	poolSoftCap: number,
// 	poolHardCap: number,
// 	minDeposit: number,
// 	maxDeposit: number,
// 	endDate: string,
// 	comissionOfHolder: number,
// 	addressForComissionPayment: string,
// 	comissionOfIcoWorld: number
// }; 

const TEST_DATA = {
	projectName: 'test project name',
	projectLink: 'test project link',
	projectAdress: 'http://test',
	poolSoftCap: 10.0,
	poolHardCap: 10.0,
	minDeposit: 10.0,
	maxDeposit: 10.0,
	//endDate: new Date(),
	comissionOfHolder: 10.0,
	addressForComissionPayment: 'addressForComissionPayment',
	comissionOfIcoWorld: 1
}

export default class PoolAdd extends Component<Props, State> {
	state = {
		input: {
			owner: '5b74fe23d55ae400216bd6ae',
			projectName: '',
			projectLink: '',
			projectAdress: '',
			poolSoftCap: '',
			poolHardCap: '',
			minDeposit: '',
			maxDeposit: '',
			endDate: '',
			comissionOfHolder: '',
			addressForComissionPayment: '',
			comissionOfIcoWorld: ''
			//...TEST_DATA
		},
		poolNameError: '',
		projectNameError: '',
		projectLinkError: '',
		projectAdressError: '',
		poolSoftCapError: '',
		poolHardCapError: '',
		minDepositError: '',
		maxDepositError: '',
		endDateError: '',
		comissionOfHolderError: '',
		addressForComissionPaymentError: '',
		comissionOfIcoWorldError: '',
		poolNameChecked: false,
		projectNameChecked: false,
		projectLinkChecked: false,
		projectAdressChecked: false,
		poolSoftCapChecked: false,
		poolHardCapChecked: false,
		minDepositChecked: false,
		maxDepositChecked: false,
		endDateChecked: false,
		comissionOfHolderChecked: false,
		addressForComissionPaymentChecked: false,
		comissionOfIcoWorldChecked: false
	};
	
	onFieldChange = (fieldName, val) => {
		const error = validate(fieldName, val);
		this.setState({
			['input.' + fieldName]: val,
			[fieldName + 'Error']: error,
			[fieldName + 'Checked']: true
		} as any);
	};
	
	getFieldStatus = (fieldName) => {
		const checked = this.state[fieldName + 'Checked'];
		const error = this.state[fieldName + 'Error'];
		
		if (checked && error.length) {
			return TextFieldStatus.CheckedWrong;
		} else if (checked && !error.length) {
			return TextFieldStatus.CheckedCorrect;
		} else {
			return TextFieldStatus.NotChecked;
		}
	}

	setDate = (newDate) => {
    this.setState({
			['input.endDate']: newDate
		} as any);
  }

	render() {
		const { style } = this.props;
		return (
			<Mutation 
				mutation={ADD_POOL} 
				onCompleted={(data) => alert(JSON.stringify(data))}
				onError={(error) => alert(JSON.stringify(error))}
			>
				{(addPool, {data}) => (
					<View style={[styles.section, style]}>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('projectName')}
							placeholder='Project name'
							value={this.state.input.projectName}
							onChangeText={(val) => this.onFieldChange('projectName', val)}
							error={this.state.projectNameError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('projectLink')}
							placeholder='Project link'
							value={this.state.input.projectLink}
							onChangeText={(val) => this.onFieldChange('projectLink', val)}
							error={this.state.projectLinkError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('projectAdress')}
							placeholder='Adress of the project'
							value={this.state.input.projectAdress}
							onChangeText={(val) => this.onFieldChange('projectAdress', val)}
							error={this.state.projectAdressError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('poolSoftCap')}
							placeholder='Soft Cap of the pool'
							value={this.state.input.poolSoftCap.toString()}
							onChangeText={(val) => this.onFieldChange('poolSoftCap', val)}
							error={this.state.poolSoftCapError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('poolHardCap')}
							placeholder='Hard Cap of the pool'
							value={this.state.input.poolHardCap.toString()}
							onChangeText={(val) => this.onFieldChange('poolHardCap', val)}
							error={this.state.poolHardCapError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('minDeposit')}
							placeholder='Min deposit per participant'
							value={this.state.input.minDeposit.toString()}
							onChangeText={(val) => this.onFieldChange('minDeposit', val)}
							error={this.state.minDepositError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('maxDeposit')}
							placeholder='Max deposit per participant'
							value={this.state.input.maxDeposit.toString()}
							onChangeText={(val) => this.onFieldChange('maxDeposit', val)}
							error={this.state.maxDepositError}
							showError={true}
							returnKeyType={'next'}
						/>
						<View style={{borderWidth: 1, marginBottom: hp('3.2%'), borderColor: '#D9D5DC'}}>
							<DatePicker
								date={this.state['input.endDate']}
								mode="date"
								placeholder="Date of the end"
								format="DD MMM YYYY"
								minDate="2018-09-03"
								maxDate="2020-06-01"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36,
										borderWidth: 0
									},
									placeholderText: {
										color: '#575757'
									}
								}}
								onDateChange={(date) => {this.setDate(date)}}
							/>
						</View>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('comissionOfHolder')}
							placeholder="Comission of pool's holder"
							value={this.state.input.comissionOfHolder.toString()}
							onChangeText={(val) => this.onFieldChange('comissionOfHolder', val)}
							error={this.state.comissionOfHolderError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('addressForComissionPayment')}
							placeholder="Comission of pool's holder"
							value={this.state.input.addressForComissionPayment}
							onChangeText={(val) => this.onFieldChange('addressForComissionPayment', val)}
							error={this.state.addressForComissionPaymentError}
							showError={true}
							returnKeyType={'next'}
						/>
						<View>
							<Button 
								full 
								primary 
								style={styles.button} 
								disabled={false} 
								onPress={
									() => addPool({ variables: {
										input:this.state.input 
									}}
								)}
							>
								<Text uppercase={false} style={styles.buttonText}>Создать</Text>
							</Button> 
						</View>
				</View>
				)}
			</Mutation>
		);
	}
}

const ADD_POOL = gql`
mutation createPool($input: PoolInput!) {
	createPool(input: $input)
}`;