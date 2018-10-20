import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/ChangePhoneScreenStyles';
import ChangePhone from '../Components/ChangePhone';
import { change } from 'redux-form';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class ChangePhoneScreen extends Component<Props> {
  onSave = () => {
    const { navigation, dispatch, change_phone } = this.props;
    !!change_phone && dispatch(change('general_settings', 'phone', change_phone.phone));
    navigation.goBack();
  }

  render() {
    //const { phone } = this.props.general_settings;
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Change phone number</Text>
        <ChangePhone onSave={this.onSave}/>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({form}:any) => {
  return {
    general_settings: form.general_settings ? form.general_settings.values : [],
    change_phone: form.change_phone ? form.change_phone.values : []
  }
};


export default connect(mapStateToProps)(ChangePhoneScreen);