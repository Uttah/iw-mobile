import React from 'react';
import { Query } from 'react-apollo';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import PoolItem from './PoolItem';
import { Spinner } from 'native-base';

type Props = {
	poolName: string,
	onPress: () => void
};

export default function FilteredPools({poolName, onPress}: Props) {
	return (
		<Query query={SEARCH_POOL} variables={{poolName}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Spinner/>;
				} 

				if (error) {
					return <Text>{JSON.stringify(error)}</Text>
				}
				
				if (data) {
					return (data.searchPool.map((pool) => 
						<PoolItem 
							item={{ 
								id: pool.poolId,
								number: pool.poolName,
								name: pool.projectName,
								comiss: 3,
								author: pool.ownerName,
								date: pool.endDate
							}} 
							key={pool.poolId}
							onPress={onPress}
						/> 
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
		ownerName,
		endDate
	}
}`;