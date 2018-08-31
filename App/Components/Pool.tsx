import React from 'react';
import { Query } from 'react-apollo';
import { View, Text } from 'react-native';
import gql from 'graphql-tag';

type Props = {
	poolId: number,
};

export default function Pool({poolId}: Props) {
	return (
		<Query query={GET_POOL} variables={{poolId}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Text>Loading</Text>;
				} 

				if (error) {
					return <Text>{JSON.stringify(error)}</Text>
				}
				
				if (data) {
					return (
						<View>
							<Text>Название пула:{data.getPool.poolName}</Text>
						</View>
					);
				}

			}}
		</Query>
	)
}

const GET_POOL = gql`
query Pool($poolId: ID!){
	getPool(poolId: $poolId) {
			poolName
	}
}`;
