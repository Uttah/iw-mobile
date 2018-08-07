import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Item, Input, Text, Icon, Label } from 'native-base';
import { TextFieldStatus } from '../Services/Enums';
import styles from './Styles/TextFieldStyles';

type Props = {
    style: any,
    placeholder: string,
    value: string,
    onChangeText: any,
    error: string,
    fieldStatus: TextFieldStatus
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
                {/* <Icon name='checkmark-circle' /> */}
            </Item>
        );        
    }

    errorTextField = (style, placeholder, value, error, onChangeText) => {
        return (
            <View style={style}>
                <Item regular error>
                    <Input 
                        placeholder = {''} 
                        value = {value}
                        onChangeText = {onChangeText}
                    />
                    {/* <Icon name='close-circle' /> */}
                </Item>
                <Label style={styles.errorLabel}>{error}</Label>
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
            error 
        } = this.props;

        return (
            <Fragment>
                {fieldStatus == TextFieldStatus.CheckedCorrect && this.successTextField(style, placeholder, value, onChangeText)}
                {fieldStatus == TextFieldStatus.CheckedWrong && this.errorTextField(style, placeholder, value, error, onChangeText)}
                {fieldStatus == TextFieldStatus.NotChecked && this.defaultTextField(style, placeholder, value, onChangeText)}
            </Fragment>
        );
    }
}