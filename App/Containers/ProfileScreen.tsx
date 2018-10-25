import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Tabs, Tab, TabHeading, Text, Fab, Container, Spinner } from 'native-base';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProfileTabs } from '../Services/Enums';
import { withApollo } from 'react-apollo';
import { GET_USER, GET_CHATS, SEARCH_POST_IN_PROFILE } from '../Services/Graphql';
import { ToastActionsCreators } from 'react-native-redux-toast';

const fetchUser = async(client:any, id:number) => {
  try {
    const result = await client.query({
      query: GET_USER,
      variables: { userId: id },
      fetchPolicy: 'network-only'
    });
    return result.data.getUser;
  } catch(err) {
    alert(err); 
  }
}

class ProfileScreen extends Component {
  state = {
    activeTab: ProfileTabs.Activity,
    isSubmitting: false,
    user: {},
    posts: [],
    postsLoaded: false
  }

  componentDidMount() {
    let profileId:string;
    let ownPage:boolean;

    if (typeof(this.props.navigation.state.params) !== 'undefined') {
      ownPage = false;
      profileId = this.props.navigation.state.params.id;
    }
    else {
      ownPage = true;
      profileId = this.props.authUser.id;
    }
    if (ownPage) {
      this.setState({
        user: this.props.authUser
      });
    } else {
      fetchUser(this.props.client, profileId).then((data) => {
        this.setState({
          user: data
        });
      });
    }

    const { client, dispatch } = this.props;
    client.query({
      query: SEARCH_POST_IN_PROFILE,
      variables: {userId: profileId, searchText: ''},
      fetchPolicy: 'network-only'
    })
    .then(result => {  
      const { posts, reposts }  = result.data.searchPostInProfile;
      if (!(posts.length == 0 && reposts.length == 0)) {
        this.setState({
          posts: posts.concat(reposts),
        });
      }
      this.setState({
        postsLoaded: true
      });
    })
    .catch(error => { 
      console.log(error);
      dispatch(ToastActionsCreators.displayError('posts load error!'));
    });
  }

  onSubmitSuccess = () => {
    const dispatch = this.props.dispatch;
    dispatch(ToastActionsCreators.displayInfo('Edited successfully!'));
  };

  onChatPress = async(userId, partnerId) => {
    const result = await this.props.client.query({
      query: GET_CHATS,
      variables: {userId: userId},
      fetchPolicy: 'network-only'
    });
    const contacts = result.data.getChats.slice().reverse();
    const filtered = contacts.filter((contact) => contact.parnter.id === partnerId);
    
    let params = { partnerId };
    if (filtered.length) {
      params.chatId = filtered[0].chatId;
    }
    this.props.navigation.navigate('MessageScreen', params);
  }
  
  onChangeTab = ({ i }) => {
    if (i == 0) {
      this.setState({
        activeTab: ProfileTabs.Activity
      });
    } else if (i == 1) {
      this.setState({
        activeTab: ProfileTabs.Portfolio
      });
    } else {
      this.setState({
        activeTab: ProfileTabs.About
      })
    }
  }
  
  onFabPress = (e) => {
    const activeTab = this.state.activeTab;
    if (activeTab == ProfileTabs.Activity) {
      alert('you want to add new post?');
    } else if (activeTab == ProfileTabs.Portfolio) {
      alert('you want to add portfolio?');
    } else {
      alert('you want to edit about me?');
    }
  }

  onCommentsPress = () => {
    this.props.navigation.navigate('CommentsScreen');
  }

  onEditPress = () => {
    this.props.navigation.navigate('EditProfileScreen', { onSubmitSuccess: this.onSubmitSuccess });
  }

  profileView = (profileUser, ownPage, profileId, authUserId, stats) => {
    const emptyUser = Object.keys(profileUser).length == 0;
    if (emptyUser) {
      return (<View><Spinner></Spinner></View>);
    } else {
      return (
        <Container>
          <ScrollView style={styles.mainContainer}>
            <ProfileTop 
              stats={stats} 
              user={profileUser} 
              ownPage={ownPage} 
              onEditPress={this.onEditPress} 
              onChatPress={ownPage ? null : () => this.onChatPress(authUserId, profileId) }
            />
            <Tabs onChangeTab={this.onChangeTab}>
              <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='newspaper-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Активность</Text></TabHeading>}>
                <ProfileTab1 
                  items={this.state.posts} 
                  loaded={this.state.postsLoaded}
                  onCommentsPress={this.onCommentsPress} 
                  ownPage={ownPage}
                />
              </Tab>
              <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='bar-chart-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Портфолио</Text></TabHeading>}>
                <ProfileTab2 />
              </Tab>
              <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='question-circle-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Обо мне</Text></TabHeading>}>
                <ProfileTab3 about={profileUser.about} clinks={profileUser.clinks} educations={profileUser.educations} jobs={profileUser.jobs}/>
              </Tab>
            </Tabs>
          </ScrollView>
        </Container>
      );			
    }
  }
  
  render() {
    let ownPage:boolean;
    let profileId:string;
    let profileUser:any;
    const authUser = this.props.authUser;

    if (typeof(this.props.navigation.state.params) !== 'undefined') {
      ownPage = false;
      profileId = this.props.navigation.state.params.id;
      profileUser = this.state.user;
    }
    else {
      ownPage = true;
      profileId = authUser.id;
      profileUser = authUser;
    }
    //нужна библиотека которая склоняет
    const stats = [
      { text: 'подписчиков', number: 150 },
      { text: 'подписан', number: 10 },
      { text: 'поста', number: 73 },
    ];
    // const items = [
    //   {
    //     id: '1',
    //     name: 'forst'
    //   },
    //   {
    //     id: '2',
    //     name: 'second'
    //   }
    // ];
    return (this.profileView(profileUser, ownPage, profileId, authUser.id, stats));
  }
}

function mapStateToProps ({user}:any) {
  return {
    authUser: user.authUser || {}
  }
}

export default connect(mapStateToProps)(withApollo(ProfileScreen));