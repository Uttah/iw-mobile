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
	projectName: string,
	projectLink: string,
	projectAdress: string,
	poolSoftCap: number,
	poolHardCap: number,
	minDeposit: number,
	maxDeposit: number,
	endDate: string,
	ownerComission: number,
	comissionPaymentAddress: string,
	iwComission: number,
}

export default class PoolAdd extends Component<Props, State> {
	state = {
		owner: this.props.authUser.id,
		projectName: '',
		projectLink: '',
		projectAdress: '',
		poolSoftCap: '',
		poolHardCap: '',
		minDeposit: '',
		maxDeposit: '',
		endDate: '',
		ownerComission: '',
		comissionPaymentAddress: '',
		poolNameError: '',
		projectNameError: '',
		projectLinkError: '',
		projectAdressError: '',
		poolSoftCapError: '',
		poolHardCapError: '',
		minDepositError: '',
		maxDepositError: '',
		endDateError: '',
		ownerComissionError: '',
		addressForComissionPaymentError: '',
		poolNameChecked: false,
		projectNameChecked: false,
		projectLinkChecked: false,
		projectAdressChecked: false,
		poolSoftCapChecked: false,
		poolHardCapChecked: false,
		minDepositChecked: false,
		maxDepositChecked: false,
		endDateChecked: false,
		ownerComissionChecked: false,
		addressForComissionPaymentChecked: false
	};
	
	onFieldChange = (fieldName, val) => {
		const error = '';
		//const error = validate(fieldName, val);
		this.setState({
			[fieldName]: val,
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
			endDate: newDate
		} as any);
	}
	
	getVariables = () => {
		const input = {
			owner: this.state.owner,
			projectName: this.state.projectName,
			projectLink: this.state.projectLink,
			projectAdress: this.state.projectAdress,
			poolSoftCap: +this.state.poolSoftCap,
			poolHardCap: +this.state.poolHardCap,
			minDeposit: +this.state.minDeposit,
			maxDeposit: +this.state.maxDeposit,
			endDate: this.state.endDate,
			ownerComission: +this.state.ownerComission,
			comissionPaymentAddress: this.state.comissionPaymentAddress,
			iwComission: 1,
		};
		return input;
	};

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
							value={this.state.projectName}
							onChangeText={(val) => this.onFieldChange('projectName', val)}
							error={this.state.projectNameError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('projectLink')}
							placeholder='Project link'
							value={this.state.projectLink}
							onChangeText={(val) => this.onFieldChange('projectLink', val)}
							error={this.state.projectLinkError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('projectAdress')}
							placeholder='Adress of the project'
							value={this.state.projectAdress}
							onChangeText={(val) => this.onFieldChange('projectAdress', val)}
							error={this.state.projectAdressError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('poolSoftCap')}
							placeholder='Soft Cap of the pool'
							value={this.state.poolSoftCap.toString()}
							onChangeText={(val) => this.onFieldChange('poolSoftCap', val)}
							error={this.state.poolSoftCapError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('poolHardCap')}
							placeholder='Hard Cap of the pool'
							value={this.state.poolHardCap.toString()}
							onChangeText={(val) => this.onFieldChange('poolHardCap', val)}
							error={this.state.poolHardCapError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('minDeposit')}
							placeholder='Min deposit per participant'
							value={this.state.minDeposit.toString()}
							onChangeText={(val) => this.onFieldChange('minDeposit', val)}
							error={this.state.minDepositError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('maxDeposit')}
							placeholder='Max deposit per participant'
							value={this.state.maxDeposit.toString()}
							onChangeText={(val) => this.onFieldChange('maxDeposit', val)}
							error={this.state.maxDepositError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('ownerComission')}
							placeholder="Comission of pool's holder"
							value={this.state.ownerComission.toString()}
							onChangeText={(val) => this.onFieldChange('ownerComission', val)}
							error={this.state.ownerComissionError}
							showError={true}
							returnKeyType={'next'}
						/>
						<TextField 
							style={styles.input}
							fieldStatus={this.getFieldStatus('comissionPaymentAddress')}
							placeholder="address for comission payment"
							value={this.state.comissionPaymentAddress}
							onChangeText={(val) => this.onFieldChange('comissionPaymentAddress', val)}
							error={this.state.addressForComissionPaymentError}
							showError={true}
							returnKeyType={'next'}
						/>
						<View style={{borderWidth: 1, marginBottom: hp('3.2%'), borderColor: '#D9D5DC'}}>
							<DatePicker
								date={this.state.endDate}
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
						<View>
							<Button 
								full 
								primary 
								style={styles.button} 
								disabled={false} 
								onPress={
									() => addPool({ variables: {
										input: this.getVariables()
									}}
								)}
							>
								<Text uppercase={false} style={styles.buttonText}>Create pool</Text>
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
	createPool(input: $input) {
		poolId,
		poolName
	}
}`;