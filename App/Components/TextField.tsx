import React, { Component, Fragment } from 'react';
import { View, TextInput } from 'react-native';
import { Item, Input, Text, Icon, Label } from 'native-base';
import { TextFieldStatus } from '../Services/Enums';
import styles from './Styles/TextFieldStyles';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    style: any,
    placeholder: string,
    value: string,
    onChangeText: (val: any) => void,
    error: string,
    fieldStatus: TextFieldStatus,
    showError: boolean,
    onSubmitEditing?: (e: any) => void,
    inputRef?: any, // inputRef is custom name
};

export default class TextField extends Component<Props> {
    handleSubmit = (e) => {
        const {onSubmitEditing} = this.props;
        if (onSubmitEditing) {
            onSubmitEditing(e);
        }
    };
    
    successTextField = (style, placeholder, value, onChangeText, ref) => {
        return (
            <Item regular success style={style}>
                <Input
                    style={styles.input} 
                    placeholder={placeholder} 
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={this.handleSubmit} 
                />
                {/* почему-то так иконки рендерятся только красного цвета */}
                {/* <Icon name='md-checkmark-circle'/> */}
                <Ionicons name="md-checkmark-circle" size={28} color='#2b8339' style={styles.icon}/>
            </Item>
        );        
    }

    errorTextField = (style, placeholder, value, onChangeText, error, showError, ref) => {
        return (
            <View style={style}>
                <Item regular error>
                    <Input 
                        style={styles.input}
                        placeholder={''} 
                        value={value}
                        onChangeText={onChangeText}
                        onSubmitEditing={this.handleSubmit}
                    />
                    <Ionicons name="md-close-circle" size={28} color='#ed2f2f' style={styles.icon}/>
                </Item>
                {showError && <Label style={styles.errorLabel}>{error}</Label>}
            </View>
        );
    }

    defaultTextField = (style, placeholder, value, onChangeText, ref) => {
        return (
            <Item regular floatingLabel style={style}>
                <Input
                    style={styles.input}
                    placeholder = {placeholder} 
                    value = {value}
                    onChangeText = {onChangeText}
                    onSubmitEditing={this.handleSubmit}
                    getRef={ref}
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
            showError,
            inputRef,
        } = this.props;

        return (
            <Fragment>
                {/* {fieldStatus == TextFieldStatus.CheckedCorrect && this.successTextField(style, placeholder, value, onChangeText, inputRef)} */}
                {/* {fieldStatus == TextFieldStatus.CheckedWrong && this.errorTextField(style, placeholder, value, onChangeText, error, showError, inputRef)} */}
                {this.defaultTextField(style, placeholder, value, onChangeText, inputRef)}
            </Fragment>
        );
    }
}
