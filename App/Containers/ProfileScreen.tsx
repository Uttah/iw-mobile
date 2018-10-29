import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Tabs, Tab, TabHeading, Text, Fab, Container, Spinner } from 'native-base';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProfileTabs } from '../Services/Enums';
import { withApollo } from 'react-apollo';
import { GET_USER, GET_CHATS, SEARCH_POST_IN_PROFILE } from '../Services/Graphql';
import { ToastActionsCreators } from 'react-native-redux-toast';
import ControlPanel from '../Components/ControlPanel';

const fetchUser = async(client:any, id:string) => {
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

const fetchPosts = async(client:any, userId:string, searchText:string) => {
  try {
    const result = await client.query({
      query: SEARCH_POST_IN_PROFILE,
      variables: { userId, searchText },
      fetchPolicy: 'network-only'
    });
    return result.data.searchPostInProfile;
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
    postsLoaded: false,
    filterStr: '',
    searchPressed: false,
    ownPage: false,
    profileId: ''
  }

  loadFilteredPosts = () => {
    const { client, dispatch } = this.props;
    const { profileId, filterStr } = this.state;
    
    fetchPosts(client, profileId, filterStr)
    .then((data) => {
      const { posts, reposts } = data;
      this.setState({
        posts: !(posts.length == 0 && reposts.length == 0) ? posts.concat(reposts) : [],
        postsLoaded: true
      });
    })
    .catch(error => { 
      console.log(error);
      dispatch(ToastActionsCreators.displayError('posts load error!'));
    });
  }


  async componentDidMount() {
    const { client, authUser } = this.props;
    let profileId:string;
    let ownPage:boolean;
    let user:any;

    if (typeof(this.props.navigation.state.params) !== 'undefined') {
      ownPage = false;
      profileId = this.props.navigation.state.params.id;
    }
    else {
      ownPage = true;
      profileId = this.props.authUser.id;
    }

    user = ownPage ? authUser : await fetchUser(client, profileId);

    //to do: cancel fetch callbacks on component unmount, errors
    this.setState({ ownPage, profileId, user }, this.loadFilteredPosts);
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

  toggleSearch = () => {
    this.setState({
      filterStr: '',
      searchPressed: false
    }, this.loadFilteredPosts);
  }

  onSearchStrChange = (text) => {
    this.setState({
      filterStr: text,
      searchPressed: false
    });
  }

  searchSubmit = () => {
    this.setState({
      searchPressed: true
    }, this.loadFilteredPosts);
  }

  profileView = (stats) => {
    const { ownPage, profileId, user } = this.state;
    const authUserId = this.props.authUser.id;
    const emptyUser = Object.keys(user).length == 0;
    if (emptyUser) {
      return (<View><Spinner></Spinner></View>);
    } else {
      return (
        <Container>
          <ScrollView style={styles.mainContainer}>
            <ProfileTop 
              stats={stats} 
              user={user} 
              ownPage={ownPage} 
              onEditPress={this.onEditPress} 
              onChatPress={ownPage ? null : () => this.onChatPress(authUserId, profileId) }
            />
            <View style={{height: hp('7.27%')}}>
              <ControlPanel 
                onChange={this.toggleSearch}
                searchStr={this.state.filterStr}
                onSearchStrChange={this.onSearchStrChange}
                searchSubmit={this.searchSubmit}
              />
            </View>
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
                <ProfileTab3 user={user}/>
              </Tab>
            </Tabs>
          </ScrollView>
        </Container>
      );			
    }
  }
  
  render() {

    //нужна библиотека которая склоняет
    const stats = [
      { text: 'подписчиков', number: 150 },
      { text: 'подписан', number: 10 },
      { text: 'поста', number: 73 },
    ];
    return (this.profileView(stats));
  }
}

function mapStateToProps ({user}:any) {
  return {
    authUser: user.authUser || {}
  }
}

export default connect(mapStateToProps)(withApollo(ProfileScreen));