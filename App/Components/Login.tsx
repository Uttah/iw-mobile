import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import styles from './Styles/LoginStyles';
import { Button, Text, Input } from 'native-base';
import TextField from './TextField';
import validate from '../Services/Validator';
import { TextFieldStatus } from '../Services/Enums';

type Props = {
    style: any,
}

type State = {
    login: string,
    password: string,
    emailError: string,
    passwordError: string,
    emailChecked: boolean,
    passwordChecked: boolean
}  

export default class Login extends Component<Props, State> {
    private passwordRef: undefined | {_root: {focus: () => void}};
    
    state = {
        login: '',
        password: '',
        emailError: '',
        passwordError: '',
        emailChecked: false,
        passwordChecked: false
    };

    onLoginChange = (val) => {
        this.setState({
            login: val,
            emailChecked: false
        });
    };

    onPasswordChange = (val) => {
        this.setState({
            password: val,
            passwordChecked: false
        });
    };

    validateLogin = () => {
        const emailError = validate('email', this.state.login);
        const passwordError = validate('password', this.state.password);
    
        this.setState({
            emailError: emailError,
            passwordError: passwordError,
            emailChecked: true,
            passwordChecked: true
        });
    
        if (!emailError && !passwordError) {
          alert('Всё правильно!')
        }
    };

    onPress = async() => {
        const {login, password} = this.state;
        try {
            //await api.init(login, password);
            //this.props.navigation.navigate('NotesScreen');
            this.validateLogin();
        } catch (err) {
            alert(err);
        }
    }

    getEmailStatus = () => {
        const { emailChecked, emailError } = this.state;
        if (emailChecked && emailError.length) {
            return TextFieldStatus.CheckedWrong;
        } else if (emailChecked && !emailError.length) {
            return TextFieldStatus.CheckedCorrect;
        } else {
            return TextFieldStatus.NotChecked;
        }
    }

    getPasswordStatus = () => {
        const { passwordChecked, passwordError } = this.state;
        if (passwordChecked && passwordError.length) {
            return TextFieldStatus.CheckedWrong;
        } else if (passwordChecked && !passwordError.length) {
            return TextFieldStatus.CheckedCorrect;
        } else {
            return TextFieldStatus.NotChecked;
        }
    }

    getSubmitDisabled = () => {
        const { login, password } = this.state;
        if (!login.length || !password.length) {
            return true;
        }
        return false;
    }

    render() {
        const style = this.props.style;

        return (
            <View style={[styles.section, style]}>
                <TextField 
                    style={styles.input}
                    fieldStatus={this.getEmailStatus()}
                    placeholder='Email'
                    value={this.state.login}
                    onChangeText={this.onLoginChange}
                    error={this.state.emailError}
                    showError={false}
                    onSubmitEditing={() => {
                        this.passwordRef && this.passwordRef._root.focus()
                    }}
                />
                <TextField 
                    style={styles.input}
                    fieldStatus={this.getPasswordStatus()}
                    placeholder='Пароль'
                    value={this.state.password}
                    onChangeText={this.onPasswordChange}
                    error={this.state.passwordError}
                    showError={false}
                    inputRef={ref => this.passwordRef = ref}
                />
                <Button full dark style={styles.button} disabled={this.getSubmitDisabled()} onPress={this.onPress} >
                    <Text uppercase={false} style={styles.buttonText}>Войти</Text>
                </Button> 
                <View style={styles.buttons}>
                    <Button transparent>
                        <Text style={styles.linkText} uppercase={false}>Забыли пароль?</Text>
                    </Button> 
                    <Button transparent>
                        <Text style={styles.linkText} uppercase={false}>Регистрация</Text>
                    </Button> 
                </View> 
            </View>
        );
    }
}