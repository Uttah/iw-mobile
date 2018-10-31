import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import Investors from '../Components/Investors';
import { NavigationActions } from 'react-navigation';
import styles from './Styles/InvestorsScreenStyles';


type Props = {
  navigation: NavigationScreenProp<any, any>
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
    const filter = this.props.filter;
    let input = {
      sortBy: filter.sortBy
    };
    if ('country' in filter && filter.country.length > 0) {
      input.country = filter.country;
    }
    if ('name' in filter && filter.name.length > 0) {
      input.name = filter.name;
    }
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Investors 
            fakeItems={items}
            input={input}
            onProfilePress={this.onProfilePress}
          />
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps ({investorsfilter}:any) {
  return {
    filter: investorsfilter
  };
}

export default connect(mapStateToProps)(InvestorsScreen);