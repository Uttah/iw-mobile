import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { FOLLOW_USER, UNFOLLOW_USER } from '../Services/Graphql';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Styles/FollowStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Follow extends Component<any> {
  followUser = async() => {
    const { client, id, afterFollow } = this.props;
    client.mutate({
      mutation: FOLLOW_USER,
      variables: { userId: id }
    })
    .then(result => {
      afterFollow();
    })
    .catch(error => {
      console.log(error);
    });
  }

  unFollowUser = async() => {
    const { client, id, afterUnfollow } = this.props;
    client.mutate({
      mutation: UNFOLLOW_USER,
      variables: { userId: id }
    })
    .then(result => {
      afterUnfollow();
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { isFollowing } = this.props;
    const text = isFollowing ? 'Unfollow' : 'Follow';
    const onPress = isFollowing ? this.unFollowUser : this.followUser;
    const iconName = isFollowing ? 'remove-circle-outline' : 'add-circle-outline';

    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <MaterialIcons 
          active 
          name={iconName}
          color={'#5A6978'} 
          size={hp('2.25%')} 
          style={styles.btnicon}
        />
        <Text style={styles.btntext}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default withApollo(Follow);