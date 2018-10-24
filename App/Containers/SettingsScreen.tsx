import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Text, Container, Button } from 'native-base';
import { Tabs, Tab, TabHeading } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import GeneralSettings from '../Components/GeneralSettings';
import styles from './Styles/SettingsScreenStyles';
import { connect } from 'react-redux';
import {
  UPDATE_USER,
  SET_PM_SENDERS,
  SET_COMMENTERS
} from '../Services/Graphql';
import { withApollo } from 'react-apollo';
import UserActions from '../Redux/UserRedux';
import LoginActions from '../Redux/LoginRedux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import PrivacySecurity from '../Components/PrivacySecurity';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

const isFieldChanged = (form, field) => {
  return form.initial[field] != form.values[field];
}

class SettingsScreen extends Component<Props> {
  
  onChangeTab = ({ i }) => {
    console.log(i);
  }

  onSave = (general_settings, privacy_security) => {
    const { dispatch, client } = this.props;
    let variables = {};

    ['email', 'language', 'phone'].forEach(function(field) {
      if (isFieldChanged(general_settings, field)) {
        variables[field] = general_settings.values[field];
      }
    });

    if (isFieldChanged(privacy_security, 'twoFactorAuth')) {
      variables['twoFactorAuth'] = privacy_security.values['twoFactorAuth'];
    }

    client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          ...variables
        }
      }
    })
    .then(result => {   
      dispatch(UserActions.updateGeneralSettings(variables));
      if ('email' in variables) {
        dispatch(LoginActions.setLogin(variables.email));
      }
      dispatch(ToastActionsCreators.displayInfo('Edited successfully!'));
    })
    .catch(error => { 
      console.log(error);
      dispatch(ToastActionsCreators.displayError('error!'));
    });

    if (isFieldChanged(privacy_security, 'pmsenders')) {
      client.mutate({
        mutation: SET_PM_SENDERS,
        variables: {
          mode: privacy_security.values['pmsenders']
        }
      })
      .then((data:any)=> console.log(data))
      .catch(error => { 
        console.log(error);
        dispatch(ToastActionsCreators.displayError('error!'));
      });
    }

    if (isFieldChanged(privacy_security, 'commenters')) {
      client.mutate({
        mutation: SET_COMMENTERS,
        variables: {
          mode: privacy_security.values['commenters']
        }
      })
      .then((data:any)=> console.log(data))
      .catch(error => { 
        console.log(error);
        dispatch(ToastActionsCreators.displayError('error!'));
      });
    }
  }

  onPhoneChange = () => {
    const { navigation } = this.props;
    navigation.navigate('ChangePhoneScreen');
  }

  onPasswordChange = () => {
    const { navigation } = this.props;
    navigation.navigate('ChangePasswordScreen');
  }
  
  render() {
    const { user, general_settings, privacy_security } = this.props;
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Tabs onChangeTab={this.onChangeTab}>
            <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='user' size={25} style={styles.tabicon}/><Text style={styles.tabname}>General</Text></TabHeading>}>
              <GeneralSettings 
                user={user}
                onPhoneChange={this.onPhoneChange} 
                onPasswordChange={this.onPasswordChange}
              />
            </Tab>
            <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><Ionicons name='md-lock' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Privacy and Security</Text></TabHeading>}>
              <PrivacySecurity user={user}/>
            </Tab>
          </Tabs>
        </ScrollView>
        <Button block primary onPress={() => this.onSave(general_settings, privacy_security)} style={styles.btn}>
          <Text style={styles.btnText}>Save</Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps({user, form}:any) {
  return {
    user: user.authUser,
    general_settings: form.general_settings ? form.general_settings : {},
    privacy_security: form.privacy_security ? form.privacy_security : {},
  };
}

export default connect(mapStateToProps)(withApollo(SettingsScreen));