import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/LoginStyles'
import { Item, Input, Button, Text } from 'native-base'

export default class Landing extends Component {
    state = {
        login: '',
        password: ''
    };

    onLoginChange = (val) => {
        this.setState({
            login: val
        });
    };

    onPasswordChange = (val) => {
        this.setState({
            password: val
        });
    };

    onPress = async() => {
        const {login, password} = this.state;
        try {
            //await api.init(login, password);
            //this.props.navigation.navigate('NotesScreen');
        } catch (err) {
            alert(err);
        }
    }

    render() {
        const style = this.props.style;

        return (
            <View style={[styles.section, style]}>
                <Item regular style={styles.input}>
                    <Input 
                        placeholder = 'Email' 
                        value = {this.state.login}
                        onChangeText = {this.onLoginChange}
                    />
                </Item>
                <Item regular style={styles.input}>
                    <Input 
                        placeholder = 'Пароль' 
                        value = {this.state.password}
                        onChangeText = {this.onPasswordChange}
                    />
                </Item>
                <Button full dark onPress={this.onPress} style={styles.button}>
                    <Text>Войти</Text>
                </Button> 
                <View style={styles.buttons}>
                    <Button transparent>
                        <Text style={styles.linkText}>Забыли пароль?</Text>
                    </Button> 
                    <Button transparent>
                        <Text style={styles.linkText}>Регистрация</Text>
                    </Button> 
                </View> 
            </View>
        );
    }
}