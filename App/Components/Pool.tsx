import React from 'react';
import { graphql } from 'react-apollo';
import { View, Text } from 'react-native';
import gql from 'graphql-tag';

function Pool({ data: { loading, getPool } }) {
	if (loading) {
		return <Text>Loading</Text>;
	} else {
		return (
			<View>
				<Text>Название пула:{getPool.poolName}</Text>
			</View>
		);
	}
}

export default graphql(gql`
  query pool{
    getPool(poolId: "5b87826b26229f0026661f1e") {
			poolName,
			projectAdress
    }
  }
`)(Pool);