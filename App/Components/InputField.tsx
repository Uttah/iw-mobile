import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import styles from './Styles/InputFieldStyles';

type Props = any;

export default class InputField extends Component<Props> {
  
  render() {
    const { input, label, type, meta: { touched, error, warning }, style, placeholder, showError } = this.props;

    let hasError = false;
    if (error !== undefined){
      hasError = true;
    }
    
    return (
      <View style={style}>
        <Item 
          regular 
          error={hasError&&input.value.length ? true : false}
          success={!hasError&&input.value.length ? true : false}
          floatingLabel={true}
        >
          <Input {...input} placeholder={placeholder} style={styles.input}/>
        </Item>
        {showError && hasError && input.value.length && <Label style={styles.errorLabel}>{error}</Label>}
      </View>
    );
  }
}


