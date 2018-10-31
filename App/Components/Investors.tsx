import React from 'react';
import { Query } from 'react-apollo';
import {
  GET_INVESTORS
} from '../Services/Graphql';
import { View, FlatList } from 'react-native';
import { Text, Spinner } from 'native-base';
import InvestorItem from '../Components/InvestorItem';
import styles from './Styles/InvestorsStyles';

type Props = {
  userId: number,
  onReplyPress: any,
  fakeItems: any
};

const listTop = () => {
  return (
    <View style={styles.listTop}>
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

export default function Investors({fakeItems, input, onProfilePress}: Props) {
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