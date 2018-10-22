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
  UPDATE_USER
} from '../Services/Graphql';
import { withApollo } from 'react-apollo';
import UserActions from '../Redux/UserRedux';
import LoginActions from '../Redux/LoginRedux';
import { ToastActionsCreators } from 'react-native-redux-toast';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class SettingsScreen extends Component<Props> {
  
  onChangeTab = ({ i }) => {
    console.log(i);
  }

  onSave = (settings) => {
    const { user, dispatch } = this.props;
    let variables = {};

    ['email', 'language', 'phone'].forEach(function(field) {
      if (settings.initial[field] != settings.values[field]) {
        variables[field] = settings.values[field];
      }
    });
    this.props.client.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          ...variables,
          id: user.id
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
    const { user } = this.props;
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Tabs onChangeTab={this.onChangeTab}>
            <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='user' size={25} style={styles.tabicon}/><Text style={styles.tabname}>General</Text></TabHeading>}>
              <GeneralSettings 
                email={user.email} 
                phone={user.phone} 
                language={user.language}
                onPhoneChange={this.onPhoneChange} 
                onPasswordChange={this.onPasswordChange}
              />
            </Tab>
            <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><Ionicons name='md-lock' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Privacy and Security</Text></TabHeading>}>
              <Text>smth</Text>
            </Tab>
          </Tabs>
        </ScrollView>
        <Button block primary onPress={() => this.onSave(this.props.general_settings)} style={styles.btn}>
          <Text style={styles.btnText}>Save</Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps({user, form}:any) {
  return {
    user: user.authUser,
    general_settings: form.general_settings ? form.general_settings : {}
  };
}

export default connect(mapStateToProps)(withApollo(SettingsScreen));