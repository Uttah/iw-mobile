import React from 'react';
import { Query } from 'react-apollo';
import { View, FlatList } from 'react-native';
import { Text, Spinner } from 'native-base';
import gql from 'graphql-tag';
import styles from './Styles/InvestorsStyles';
import InvestorItem from '../Components/InvestorItem';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  userId: number,
  onReplyPress: any,
  fakeItems: any
};

const listTop = () => {
  return (
    <View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
      <Text style={styles.headerTitle}>Investors</Text>
    </View>
  );
}

const InvestorsList = ({ items, onPress }) => (
  <FlatList
    data={items}
    renderItem={({item}) => {
      return (
        <InvestorItem item={item} onPress={onPress}/>
      );
    }}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={listTop()}
  />
);

export default function Investors({userId, fakeItems, onProfilePress}: Props) {
  const input = {
    "sortBy": "NUMBER_OF_FOLLOWERS"
  };

  return (
    <Query query={GET_INVESTORS} variables={{input}}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Spinner/>;
        } 

        if (error) {
          console.log(JSON.stringify(error));
        }
        
        if (data && data.getInvestors) {
          return (
            <InvestorsList items={data.getInvestors} onPress={onProfilePress} />
          );
        } else {
          return (
            <InvestorsList items={fakeItems} onPress={onProfilePress} />
          )
        }

      }}
    </Query>
  )
}

const GET_INVESTORS = gql`
query getInvestors($input: InvestorsFilterParamsInput!) {
  getInvestors(input: $input) {
    id,
    name,
    login,
    countOfFollowers
  }
}`;