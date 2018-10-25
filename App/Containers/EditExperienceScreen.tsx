import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import styles from './Styles/AddExperienceScreenStyles';
import AddExperience from '../Components/AddExperience';
import EditUserActions from '../Redux/EditUserRedux';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class EditExperienceScreen extends Component<Props> {
  onSave = () => {
    const { dispatch, navigation, job } = this.props;
    const { id } = navigation.state.params;
    !!job && dispatch(EditUserActions.editExperience({...job, id}));
    navigation.goBack();
  }

  render() {
    const { job } = this.props.navigation.state.params;
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Edit experience</Text>
        <AddExperience 
          onSave={this.onSave} 
          edit={true}
          job={job}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({form, edituser}:any) => {
  return {
    job: form.add_experience ? form.add_experience.values : []
  }
};


export default connect(mapStateToProps)(EditExperienceScreen);