import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/AddExperienceScreenStyles';
import AddEducation from '../Components/AddEducation';
import EditUserActions from '../Redux/EditUserRedux';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class EditEducationScreen extends Component<Props> {
  onSave = () => {
    const { dispatch, navigation, education } = this.props;
    const { id } = navigation.state.params;
    !!education && dispatch(EditUserActions.editEducation({...education, id}));
    navigation.goBack();
  }

  render() {
    const { education } = this.props.navigation.state.params;
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Edit education</Text>
        <AddEducation 
          onSave={this.onSave} 
          edit={true}
          education={education}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({form, edituser}:any) => {
  return {
    education: form.add_education ? form.add_education.values : []
  }
};


export default connect(mapStateToProps)(EditEducationScreen);