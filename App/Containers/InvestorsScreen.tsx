import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/InvestorsScreenStyles';
import Investors from '../Components/Investors';
import UserActions from '../Redux/UserRedux';
import { NavigationActions } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any, any>,
  userId: string
}

class InvestorsScreen extends Component<Props> {
  onProfilePress = (id) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ProfileScreen',
      params: { id }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const items = [
      { id: '1', messagesNum: 3, author: 'Иван Фёдоров' },
      { id: '2', messagesNum: 0, author: 'Елена Кукушкина' }
    ];
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Investors 
            fakeItems={items}
            onProfilePress={this.onProfilePress}
          />
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  let obj = {
    userId: state.user.authUser.id
  };
  return obj;
}

export default connect(mapStateToProps)(InvestorsScreen);