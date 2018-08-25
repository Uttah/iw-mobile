import React, { Component } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import styles from './Styles/RegisterStyles';
import { Button, Text, ListItem, Body, List } from 'native-base';
import { Switch } from 'react-native';
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
	name: string,
	lastName: string,
	email: string,
	password: string,
	nameError: string,
	lastNameError: string,
	emailError: string,
	passwordError: string,
	nameChecked: boolean,
	lastNameChecked: boolean,
	emailChecked: boolean,
	passwordChecked: boolean,
	consent: boolean
}; 

export default class Register extends Component<Props, State> {
	private passwordRef: undefined | {_root: {focus: () => void, blur: () => void}};
	private emailRef: undefined | {_root: {focus: () => void, blur: () => void}};
	private lastNameRef: undefined | {_root: {focus: () => void, blur: () => void}};
	
	state = {
		name: '',
		lastName: '',
		email: '',
		password: '',
		nameError: '',
		lastNameError: '',
		emailError: '',
		passwordError: '',
		nameChecked: false,
		lastNameChecked: false,
		emailChecked: false,
		passwordChecked: false,
		consent: false
	};

	toggleConsent = (val) => {
		this.setState({
			consent: val
		});
	}
	
	onFieldChange = (fieldName, val) => {
		const error = validate(fieldName, val);
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
	
	validateLogin = async() => {
		const emailError = validate('email', this.state.email);
		const passwordError = validate('password', this.state.password);
		const nameError = validate('name', this.state.name);
		const lastNameError = validate('lastName', this.state.lastName);
		
		this.setState({
			emailError: emailError,
			passwordError: passwordError,
			nameError: nameError,
			lastNameError: lastNameError,
			emailChecked: true,
			passwordChecked: true,
			nameChecked: true,
			lastNameChecked: true
		});
		
		if (!emailError && !passwordError && !nameError && !lastNameError) {
			const { email, password, name, lastName } = this.state;
			try {
				const userData = await api.register(email, password, name, lastName);
				this.props.onSuccess(userData.name);
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
		if (this.hasBlanks() || this.hasErrors()) {
		  return true;
		}
		return false;
	}

	hasBlanks = () => {
		const { email, password, name, lastName, consent } = this.state;
		if (!email.length || !password.length || !name.length || !lastName.length || !consent) {
			return true;
		}
		return false;
	}

	hasErrors = () => {
		const { emailError, passwordError, nameError, lastNameError } = this.state;
		if (emailError.length || passwordError.length || nameError.length || lastNameError.length) {
			return true;
		}
		return false;
	}
	
	onBtnLayout = (e) => {
		const layout = e.nativeEvent.layout;
		const btnHeight = layout.height;
		this.props.onButtonViewLayout(btnHeight);
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
					showError={true}
					onSubmitEditing={() => {
					    this.lastNameRef && this.lastNameRef._root.focus()
					}}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('lastName')}
					placeholder='Фамилия'
					value={this.state.lastName}
					onChangeText={(val) => this.onFieldChange('lastName', val)}
					error={this.state.lastNameError}
					showError={true}
					inputRef={ref => this.lastNameRef = ref}
					onSubmitEditing={() => {
					    this.emailRef && this.emailRef._root.focus()
					}}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('email')}
					placeholder='Email'
					value={this.state.email}
					onChangeText={(val) => this.onFieldChange('email', val)}
					error={this.state.emailError}
					showError={true}
					inputRef={ref => this.emailRef = ref}
					onSubmitEditing={() => {
					    this.passwordRef && this.passwordRef._root.focus()
					}}
					returnKeyType={'next'}
				/>
				<TextField 
					style={styles.input}
					fieldStatus={this.getFieldStatus('password')}
					placeholder='Пароль'
					value={this.state.password}
					onChangeText={(val) => this.onFieldChange('password', val)}
					error={this.state.passwordError}
					showError={true}
					inputRef={ref => this.passwordRef = ref}
					returnKeyType={'done'}
					secureTextEntry={true}
				/>
				<View onLayout={(e) => this.onBtnLayout(e)}>
					<Button 
						full 
						primary 
						style={styles.button} 
						disabled={this.getSubmitDisabled()} 
						onPress={this.onPress}
					>
						<Text uppercase={false} style={styles.buttonText}>Зарегистрироваться</Text>
					</Button> 
				</View>
				<List>
					<ListItem noBorder noIndent style={styles.checkboxWrap}>
						<Switch 
							value={this.state.consent} 
							tintColor={'#3f51b5'} 
							onTintColor={'#3f51b5'} 
							onValueChange={(val) => this.toggleConsent(val)}/>
						<Body>
							<Text style={styles.checkboxText}>Я принимаю условия Пользовательского соглашения и даю свое согласие icoWorld на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности</Text>
						</Body>
					</ListItem>
				</List>
			</View>
		);
	}
}