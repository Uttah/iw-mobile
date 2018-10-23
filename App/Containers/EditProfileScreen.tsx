import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TabHeading } from 'native-base';
import styles from './Styles/EditProfileScreenStyles';
import EditProfile from '../Components/EditProfile';
import { connect } from 'react-redux';
import {
  UPDATE_USER,
  ADD_JOB,
  REMOVE_JOB,
  REMOVE_EDUCATION,
  ADD_EDUCATION,
  UPDATE_JOB,
  UPDATE_EDUCATION
} from '../Services/Graphql';
import { withApollo } from 'react-apollo';
import UserActions from '../Redux/UserRedux';
import EditUserActions from '../Redux/EditUserRedux';
import { ToastActionsCreators } from 'react-native-redux-toast';

const guid = ()  =>{
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class EditProfileScreen extends Component<Props> {
  componentDidMount(){
    const { dispatch, authUser } = this.props;
    dispatch(EditUserActions.setExperiences(authUser.jobs));
    dispatch(EditUserActions.setEducations(authUser.educations));
  }

  onAddEducationPress = () => {
    this.props.navigation.navigate('AddEducationScreen');
  }

  onAddExperiencePress = () => {
    this.props.navigation.navigate('AddExperienceScreen');
  }

  onEducationEdit = (id) => {
    const { navigation, educations, educationsAdded } = this.props;
    const isAdded = educationsAdded.filter((e) => e.id == id).length > 0;
    let education:any;
    
    if (isAdded) {
      education = educationsAdded.filter(e => e.id == id)[0];
    } else {
      education = educations.filter(e => e.id == id)[0];
    }

    navigation.navigate('EditEducationScreen', { id, education });
  }

  onExperienceEdit = (id) => {
    const { navigation, jobs, jobsAdded } = this.props;
    const isAdded = jobsAdded.filter((e) => e.id == id).length > 0;
    let job:any;
    
    if (isAdded) {
      job = jobsAdded.filter(e => e.id == id)[0];
    } else {
      job = jobs.filter(e => e.id == id)[0];
    }

    navigation.navigate('EditExperienceScreen', { id, job });
  }

  onEducationDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(EditUserActions.deleteEducation(id));
  }

  onExperienceDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(EditUserActions.deleteExperience(id));
  }

  addEducation = async(education) => {
    const data = await this.props.client.mutate({
      mutation: ADD_EDUCATION,
      variables: { 
        input: {
          name: education.name,
          from: education.from,
          to: education.to
        }
      }
    });
    return {
      ...education,
      id: data.data.addEducation
    }
  }

  addEducations = async(educations) => {
    return Promise.all(educations.map((education) => this.addEducation(education)));
  }

  addExperience = async(job) => {
    const data = await this.props.client.mutate({
      mutation: ADD_JOB,
      variables: { 
        input: {
          name: job.name,
          from: job.from,
          to: job.to
        }
      }
    });
    return {
      ...job,
      id: data.data.addJob
    }
  }

  addExperiences = async(jobs) => {
    return Promise.all(jobs.map((job) => this.addExperience(job)));
  }

  removeEducation = async(education) => {
    const data = 	await this.props.client.mutate({
      mutation: REMOVE_EDUCATION,
      variables: {
        id: education.id
      }
    });
    return {
      id: education.id,
      removed: data.data.removeEducation
    }
  }

  removeEducations = async(educations) => {
    return Promise.all(educations.map((education) => this.removeEducation(education)));
  }

  removeExperience = async(job) => {
    const data = 	await this.props.client.mutate({
      mutation: REMOVE_JOB,
      variables: {
        id: job.id
      }
    });
    return {
      id: job.id,
      removed: data.data.removeJob
    }
  }

  removeExperiences = async(jobs) => {
    return Promise.all(jobs.map((job) => this.removeExperience(job)));
  }

  editEducation = async(education) => {
    const data = await this.props.client.mutate({
      mutation: UPDATE_EDUCATION,
      variables: {
        id: education.id,
        input: {
          name: education.name,
          from: education.from,
          to: education.to
        }
      }
    });

    return {...education, updated: data.data.updateEducation};
  }

  editEducations = async(educations) => {
    return Promise.all(educations.map((education) => this.editEducation(education)));
  }

  editExperience = async(job) => {
    const data = await this.props.client.mutate({
      mutation: UPDATE_JOB,
      variables: {
        id: job.id,
        input: {
          name: job.name,
          from: job.from,
          to: job.to
        }
      }
    });

    return {...job, updated: data.data.updateJob};
  }

  editExperiences = async(jobs) => {
    return Promise.all(jobs.map((job) => this.editExperience(job)));
  }

  updateUserProfileItems = async(items, callback1, filter1, callback2, filter2?:any) => {
    const { dispatch } = this.props;
    const updates = items.filter(filter1);
    if (updates.length > 0) {
      callback1(updates)
      .then(result => {
        dispatch(
          callback2(
            typeof(filter2) != 'undefined' ? 
            result.filter(filter2) : 
            result
          )
        );
      })
      .catch(error => {
        console.log(error);
        dispatch(ToastActionsCreators.displayError('error!'));
      })
    }
  }

  handleSave = async(id, form) => {
    const { name, login, country, city, site, about, fb, linkedin, twitter } = form.values;
    const { client, dispatch, jobs, educations, jobsAdded, educationsAdded } = this.props;

    client.mutate({
      mutation: UPDATE_USER,
      variables: {input: {
        name: name,
        login: login,
        country: country,
        city: city,
        site: site,
        clinks: {
          fb: fb,
          linkedin: linkedin,
          twitter: twitter,
        },
        about: about
      }},
    })
    .then(result => {
      dispatch(UserActions.updateUser(result.data.updateUser));
    })
    .catch(error => {
      console.log(error);
      dispatch(ToastActionsCreators.displayError('error!'));
    })

    this.updateUserProfileItems(
      educationsAdded, 
      this.addEducations, 
      e => !e.deleted, 
      UserActions.addUserEducations
    ); 

    this.updateUserProfileItems(
      jobsAdded, 
      this.addExperiences, 
      e => !e.deleted, 
      UserActions.addUserExperiences
    ); 

    this.updateUserProfileItems(
      educations, 
      this.editEducations, 
      e => e.edited, 
      UserActions.editUserEducations
    ); 

    this.updateUserProfileItems(
      jobs, 
      this.editExperiences, 
      e => e.edited, 
      UserActions.editUserExperiences,
      e => e.updated
    ); 

    this.updateUserProfileItems(
      educations, 
      this.removeEducations, 
      e => e.deleted, 
      UserActions.removeUserEducations,
      e => e.removed
    ); 

    this.updateUserProfileItems(
      jobs, 
      this.removeExperiences, 
      e => e.deleted, 
      UserActions.removeUserExperiences,
      e => e.removed
    ); 

    dispatch(EditUserActions.reset());

    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { authUser, form, educations, educationsAdded, jobs, jobsAdded } = this.props;
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Edit profile</Text>
        <EditProfile 
          educations={educations.concat(educationsAdded).filter((education) => !education.deleted)} 
          jobs={jobs.concat(jobsAdded).filter((job) => !job.deleted)}
          name={authUser.name}
          login={authUser.login}
          about={authUser.about}
          clinks={authUser.clinks}
          country={authUser.country}
          city={authUser.city}
          site={authUser.site}
          handleSave={() => this.handleSave(authUser.id, form)}
          onAddEducationPress={this.onAddEducationPress}
          onAddExperiencePress={this.onAddExperiencePress}
          onEducationEdit={this.onEducationEdit}
          onExperienceEdit={this.onExperienceEdit}
          onEducationDelete={this.onEducationDelete}
          onExperienceDelete={this.onExperienceDelete}
        />
      </KeyboardAwareScrollView>
    );
  }
}

function mapStateToProps({user, edituser, form}:any) {
  return {
    authUser: user.authUser,
    form: form.edit_profile,
    jobsAdded: edituser.jobsAdded || [],
    jobs: edituser.jobs || [],
    educationsAdded: edituser.educationsAdded || [],
    educations: edituser.educations || []
  };
}

export default connect(mapStateToProps)(withApollo(EditProfileScreen));