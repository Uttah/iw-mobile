import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Text, Container, Button } from 'native-base';
import { Tabs, Tab, TabHeading } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import GeneralSettings from '../Components/GeneralSettings';
import styles from './Styles/SettingsScreenStyles';
import { connect } from 'react-redux';
import { UserTypes } from 'App';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class SettingsScreen extends Component<Props> {
  
  onChangeTab = ({ i }) => {
    console.log(i);
  }

  onSave = (settings) => {
    console.log('ha');
  }
  
  render() {
    const { user } = this.props;
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Tabs onChangeTab={this.onChangeTab}>
            <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='user' size={25} style={styles.tabicon}/><Text style={styles.tabname}>General</Text></TabHeading>}>
              <GeneralSettings email={user.email} phone={user.phone}/>
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
    general_settings: form.general_settings ? form.general_settings.values : []
  };
}

export default connect(mapStateToProps)(SettingsScreen);