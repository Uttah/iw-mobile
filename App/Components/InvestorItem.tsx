import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { endpoint } from '../Services/Utils';
import { 
  GET_SUBSCRIBERS
} from '../Services/Graphql';
import { Images } from 'App/Themes';
import Follow from '../Components/Follow';
import styles from './Styles/InvestorItemStyles';

const fetchFollowers = async(client:any, userId:string) => {
  try {
    const result = await client.query({
      query: GET_SUBSCRIBERS,
      variables: { userId },
      fetchPolicy: 'network-only'
    });
    return result.data.getSubscribers;
  } catch(err) {
    alert(err); 
  }
}

class InvestorItem extends Component {
  state = {
    followers: [],
    followersLoaded: false,
    isFollowing: false
  }

  async componentDidMount() {
    this.loadFollowers();
  }

  onInvestorPress = () => {
    const { id } = this.props.item;
    this.props.onPress(id);
  }

  loadFollowers = () => {
    const { client, authUser } = this.props;
    const { id } = this.props.item;
    
    fetchFollowers(client, id)
      .then((data) => {
        this.setState({
          followers: data,
          followersLoaded: true,
          isFollowing: data.findIndex((user:any) => user.id === authUser.id) === -1 ? false : true
        });
      })
      .catch(error => { 
        console.log(error);
      });
  }

  afterFollow = () => {
    this.setState({ isFollowing: true });
  }

  afterUnfollow = () => {
    this.setState({ isFollowing: false });
  }

  render() {
    const { id, name, login, avatar, countOfFollowers } = this.props.item;
    const avatarSource = !!avatar ? {uri: `${endpoint}/images/${id}/${avatar}`} : Images.noAvatar;
    const { followersLoaded, isFollowing } = this.state;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onInvestorPress}>
        <View style={styles.inner}>
          <TouchableHighlight style={styles.avatarWrap}>
            <Image
              source={avatarSource}
              resizeMode={'cover'}
              style={styles.avatar}
            />
          </TouchableHighlight>
          {followersLoaded && 
            <Follow 
              style={styles.follow}
              id={id}
              afterFollow={this.afterFollow} 
              afterUnfollow={this.afterUnfollow}
              isFollowing={isFollowing}
              primary={true}
            />
          }
          <Text style={styles.name}>{name}</Text>
          {!!login && login.length > 0 && <Text style={styles.login}>@{login}</Text>}
          <Text style={styles.subscribers}>{countOfFollowers} followers</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps ({user}:any) {
  return {
    authUser: user.authUser || {}
  }
}

export default connect(mapStateToProps)(withApollo(InvestorItem));