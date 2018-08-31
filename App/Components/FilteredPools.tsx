import React from 'react';
import { Query } from 'react-apollo';
import { View, Text } from 'react-native';
import gql from 'graphql-tag';
import PoolItem from './PoolItem';

type Props = {
	poolName: string,
};

export default function FilteredPools({poolName}: Props) {
	return (
		<Query query={SEARCH_POOL} variables={{poolName}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Text>Loading</Text>;
				} 

				if (error) {
					return <Text>{JSON.stringify(error)}</Text>
				}
				
				if (data) {
					return (data.searchPool.map((pool) => 
						<PoolItem item={{ 
							id: pool.poolId,
							number: pool.poolName,
							name: pool.projectName,
							comiss: 3,
							author: 'Иван Фёдоров',
							date: pool.endDate
						}} key={pool.poolId}/> 
					))
				}
			}}
		</Query>
	)
}

const SEARCH_POOL = gql`
query searchPool($poolName: String!){
	searchPool(poolName: $poolName) {
		poolId,
		poolName,
		projectName,
		endDate
	}
}`;