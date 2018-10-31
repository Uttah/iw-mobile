import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import InvestorsFilters from '../Components/InvestorsFilters';
import InvestorsFiltersActions from '../Redux/InvestorsFilterRedux';
import styles from './Styles/InvestorsFiltersScreenStyles';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class InvestorsFiltersScreen extends Component<Props> {
  onSave = () => {
    const { dispatch, navigation, filters } = this.props;
    !!filters && dispatch(InvestorsFiltersActions.apply(filters));
    navigation.goBack();
  }

  render() {
    const { country, sortBy} = this.props.investorsfilter;
    return (
      <KeyboardAwareScrollView
        style={styles.mainContainer}  
      >
        <Text style={styles.headerTitle}>Filters</Text>
        <InvestorsFilters 
          country={country}
          sortBy={sortBy}
          onSave={this.onSave}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({investorsfilter, form}:any) => {
  return {
    investorsfilter: investorsfilter ? investorsfilter: {},
    filters: form.investors_filters ? form.investors_filters.values : []
  }
};


export default connect(mapStateToProps)(InvestorsFiltersScreen);