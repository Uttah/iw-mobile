import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Item, Input, Text, Icon, Label } from 'native-base';
import { TextFieldStatus } from '../Services/Enums';
import styles from './Styles/TextFieldStyles';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    style: any,
    placeholder: string,
    value: string,
    onChangeText: any,
    error: string,
    fieldStatus: TextFieldStatus,
    showError: boolean
};

export default class TextField extends Component<Props> {
    successTextField = (style, placeholder, value, onChangeText) => {
        return (
            <Item regular success style={style}>
                <Input 
                    placeholder = {placeholder} 
                    value = {value}
                    onChangeText = {onChangeText}
                />
                {/* почему-то так иконки рендерятся только красного цвета */}
                {/* <Icon name='md-checkmark-circle'/> */}
                <Ionicons name="md-checkmark-circle" size={28} color='#2b8339' style={styles.icon}/>
            </Item>
        );        
    }

    errorTextField = (style, placeholder, value, onChangeText, error, showError) => {
        return (
            <View style={style}>
                <Item regular error>
                    <Input 
                        placeholder = {''} 
                        value = {value}
                        onChangeText = {onChangeText}
                    />
                    <Ionicons name="md-close-circle" size={28} color='#ed2f2f' style={styles.icon}/>
                </Item>
                {showError && <Label style={styles.errorLabel}>{error}</Label>}
            </View>
        );
    }

    defaultTextField = (style, placeholder, value, onChangeText) => {
        return (
            <Item regular style={style}>
                <Input 
                    placeholder = {placeholder} 
                    value = {value}
                    onChangeText = {onChangeText}
                />
            </Item>
        );
    }

    render() {
        const { 
            style,
            fieldStatus, 
            placeholder, 
            value, 
            onChangeText, 
            error,
            showError 
        } = this.props;

        return (
            <Fragment>
                {fieldStatus == TextFieldStatus.CheckedCorrect && this.successTextField(style, placeholder, value, onChangeText)}
                {fieldStatus == TextFieldStatus.CheckedWrong && this.errorTextField(style, placeholder, value, onChangeText, error, showError)}
                {fieldStatus == TextFieldStatus.NotChecked && this.defaultTextField(style, placeholder, value, onChangeText)}
            </Fragment>
        );
    }
}