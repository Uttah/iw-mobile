import React, { Component } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import styles from './Styles/RegisterStyles';
import { Button, Text, ListItem, Body, List } from 'native-base';
import { CheckBox, Switch } from 'react-native';
import TextField from './TextField';
import validate from '../Services/Validator';
import api from '../Services/MyApi';
import { TextFieldStatus } from '../Services/Enums';

const platform = Platform.OS;

type Props = {
	style: any,
	onButtonViewLayout: (val: number) => void,
	onRegisterPress: () => void
};

type State = {
	login: string,
	password: string,
	name: string,
	lastName: string,
	emailError: string,
	passwordError: string,
	nameError: string,
	lastNameError: string,
	emailChecked: boolean,
	passwordChecked: boolean,
	nameChecked: boolean,
	lastNameChecked: boolean
}; 

export default class Register extends Component<Props, State> {
	private passwordRef: undefined | {_root: {focus: () => void, blur: () => void}};
	
	state = {
		login: '',
		password: '',
		name: '',
		lastName: '',
		emailError: '',
		passwordError: '',
		nameError: '',
		lastNameError: '',
		emailChecked: false,
		passwordChecked: false,
		nameChecked: false,
		lastNameChecked: false
	};
	
	onFieldChange = (fieldName, val) => {
		this.setState({
			[fieldName]: val,
			[fieldName + 'Checked']: false
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
	
	validateLogin = async() => {
		const emailError = validate('email', this.state.login);
		const passwordError = validate('password', this.state.password);
		
		this.setState({
			emailError: emailError,
			passwordError: passwordError,
			emailChecked: true,
			passwordChecked: true
		});
		
		if (!emailError && !passwordError) {
			const {login, password} = this.state;
			try {
				const userData = await api.init(login, password);
				alert(JSON.stringify(userData));
				//navigate to another screen
			} catch (err) {
				alert(err);
			}
		}
	};
	
	onPress = () => {
		Keyboard.dismiss();
		this.validateLogin();
	}
	
	getSubmitDisabled = () => {
		// const { login, password } = this.state;
		// if (!login.length || !password.length) {
		//     return true;
		// }
		return false;
	}
	
	onBtnLayout = (e) => {
		const layout = e.nativeEvent.layout;
		const btnHeight = layout.height;
		//this.props.onButtonViewLayout(btnHeight);
	}
	
	render() {
		const { style } = this.props;
		
		return (
			<View style={[styles.section, style]}>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('name')}
					placeholder='Имя'
					value={this.state.name}
					onChangeText={(val) => this.onFieldChange('name', val)}
					error={this.state.nameError}
					showError={false}
					// onSubmitEditing={() => {
					//     this.passwordRef && this.passwordRef._root.focus()
					// }}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('lastName')}
					placeholder='Фамилия'
					value={this.state.lastName}
					onChangeText={(val) => this.onFieldChange('lastName', val)}
					error={this.state.lastNameError}
					showError={false}
					// onSubmitEditing={() => {
					//     this.passwordRef && this.passwordRef._root.focus()
					// }}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('email')}
					placeholder='Email'
					value={this.state.email}
					onChangeText={(val) => this.onFieldChange('email', val)}
					error={this.state.emailError}
					showError={false}
					// onSubmitEditing={() => {
					//     this.passwordRef && this.passwordRef._root.focus()
					// }}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('password')}
					placeholder='Пароль'
					value={this.state.password}
					onChangeText={(val) => this.onFieldChange('password', val)}
					error={this.state.passwordError}
					showError={false}
					// onSubmitEditing={() => {
					//     this.passwordRef && this.passwordRef._root.focus()
					// }}
					returnKeyType={'done'}
				/>
				<View onLayout={(e) => this.onBtnLayout(e)}>
					<Button 
						full 
						primary 
						style={styles.button} 
						disabled={this.getSubmitDisabled()} 
						onPress={this.onPress}
					>
						<Text uppercase={false} style={styles.buttonText}>Войти</Text>
					</Button> 
				</View>
				<List>
					<ListItem noBorder noIndent style={styles.checkboxWrap}>
						{platform === "ios" ? <Switch value={true} tintColor={'#3f51b5'} onTintColor={'#3f51b5'}/> : <CheckBox checked={true}/>}
						<Body>
							<Text style={styles.checkboxText}>Я принимаю условия Пользовательского соглашения и даю свое согласие icoWorld на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности</Text>
						</Body>
					</ListItem>
				</List>
			</View>
		);
	}
}