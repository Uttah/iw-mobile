import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import styles from './Styles/LoginStyles';
import { Button, Text, Input } from 'native-base';
import TextField from './TextField';
import validate from '../Services/Validator';
import api from '../Services/MyApi';
import { TextFieldStatus } from '../Services/Enums';


type Props = {
  style: any,
  onButtonViewLayout: (val: number) => void,
  onRegisterPress: () => void
};

type State = {
  login: string,
  password: string,
  emailError: string,
  passwordError: string,
  emailChecked: boolean,
  passwordChecked: boolean
}; 

export default class Login extends Component<Props, State> {
  private passwordRef: undefined | {_root: {focus: () => void, blur: () => void}};
  
  state = {
    login: 'smirnovanatalia2008@gmail.com',
    password: '123456',
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
        const userData = await api.login(login, password);
        this.props.onSuccess(userData);
      } catch (err) {
        alert(err);
      }
    }
  };
  
  onPress = () => {
    Keyboard.dismiss();
    this.validateLogin();
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
  
  onBtnLayout = (e) => {
    const layout = e.nativeEvent.layout;
    const btnHeight = layout.height;
    this.props.onButtonViewLayout(btnHeight);
  }
  
  render() {
    const { style, onRegisterPress, onForgotPress } = this.props;
    
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
          returnKeyType={'next'}
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
        <View style={styles.buttons}>
        <Button transparent>
          <Text style={styles.linkText} uppercase={false} onPress={onForgotPress}>Забыли пароль?</Text>
        </Button> 
        <Button transparent>
          <Text style={styles.linkText} uppercase={false} onPress={onRegisterPress}>Регистрация</Text>
        </Button> 
      </View> 
      </View>
    );
  }
}