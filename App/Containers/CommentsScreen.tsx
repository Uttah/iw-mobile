import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Button } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/CommentsScreenStyles';
import CommentItem from '../Components/CommentItem';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RootActions from '../Redux/RootRedux';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class CommentsScreen extends Component<Props> {
  onPress = () => {
    this.props.dispatch(RootActions.showCommentsModal());
  }

  renderItem = ({ item }) => {
    return (
      <CommentItem item={item} onPress={this.onPress}/>
    );
  };

  listTop = () => {
    return (
      <View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
        <Text style={styles.headerTitle}>Comments</Text>
      </View>
    );
  }

  render() {
    const items = [
      { 
        id: '1', 
        userName: 'Stella Johnson', 
        userLogin: '@hotchick',
        content: 'This will be the first answer', 
        date: '27 October, 14:56'
      },
      { 
        id: '2', 
        userName: 'Alex Brown', 
        userLogin: '@youdontknow',
        content: 'This will be the first answer', 
        date: '27 October, 14:56'
      },
      { 
        id: '3', 
        userName: 'Domnic Brown', 
        userLogin: '@hotguy',
        content: 'This will be the first answer', 
        date: '27 October, 14:56'
      },
      { 
        id: '4', 
        userName: 'John Smith', 
        userLogin: '@johnny',
        content: 'This will be the first answer', 
        date: '27 October, 14:56'
      }
    ];
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <FlatList
            data={items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={this.listTop()}
          />
        </ScrollView>
        <Button 
          full 
          primary 
          style={styles.button} 
          disabled={false} 
          onPress={this.onPress}
        >
          <Text uppercase={false} style={styles.buttonText}>Comment</Text>
        </Button> 
      </Container>
    );
  }
}

export default connect()(CommentsScreen);