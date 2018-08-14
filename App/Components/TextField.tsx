import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';
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
    inputRef?: any, // inputRef is custom name,
    returnKeyType?: string
};

export default class TextField extends Component<Props> {
    handleSubmit = (e) => {
        const {onSubmitEditing} = this.props;
        if (onSubmitEditing) {
            onSubmitEditing(e);
        }
    };

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
            returnKeyType
        } = this.props;

        return (
            <Fragment>
                <View style={style}>
                    <Item 
                        regular 
                        error={fieldStatus == TextFieldStatus.CheckedWrong ? true : false}
                        success={fieldStatus == TextFieldStatus.CheckedCorrect ? true : false}
                        floatingLabel={true}
                    >
                        <Input 
                            style={styles.input}
                            placeholder={placeholder} 
                            value={value}
                            onChangeText={onChangeText}
                            onSubmitEditing={this.handleSubmit}
                            getRef={inputRef}
                            returnKeyType={returnKeyType}
                        />
                    </Item>
                    {fieldStatus == TextFieldStatus.CheckedWrong && showError && <Label style={styles.errorLabel}>{error}</Label>}
                </View>
            </Fragment>
        );
    }
}
