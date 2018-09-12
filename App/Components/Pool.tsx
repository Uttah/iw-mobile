import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { List, ListItem, Text, Spinner } from 'native-base';
import gql from 'graphql-tag';
import styles from './Styles/PoolStyles';
import Author from './Author';

type Props = {
	poolId: number,
};

const renderFieldVal = (label, value, unit='') => (
	<ListItem noIndent style={styles.listItem}>
		<View style={styles.listItemInner}>
			<Text style={styles.listItemTitle}>{label}</Text>
		</View>
		<View style={styles.listItemInner}>
			<Text style={styles.listItemText}>{value ? `${value}${unit}` : '-'}</Text>
		</View>
	</ListItem>
);

const PoolView = ({pool}) => (
	<View>
		<Text style={styles.poolName}>Пул {pool.poolName}</Text>
		<List>
			{/* fix странного бага с первым элементом списка с noIndent */}
			<ListItem noIndent style={styles.listItem}></ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Pool's holder</Text>
				</View>
				<Author author={pool.ownerName} style={{}}/>
			</ListItem>
			{ renderFieldVal('Open code of smart-contract of the pool', pool.status) }
			{ renderFieldVal('Project', 'Project') }
			{ renderFieldVal('Address of the project', pool.projectAdress) }
			{ renderFieldVal('Soft Cap of the pool', pool.poolSoftCap) }
			{ renderFieldVal('Hard Cap of the pool', pool.poolHardCap) }
			{ renderFieldVal('Min deposit per participant', pool.minDeposit) }
			{ renderFieldVal('Max deposit per participant', pool.maxDeposit) }
			{ renderFieldVal('Date of the end', new Date(pool.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })) }
			{ renderFieldVal("Comission of pool's holder", pool.ownerComission, '%') }
			{ renderFieldVal('Comission of icoWorld', pool.iwComission, '%') }
		</List>
	</View>
);

export default function Pool({poolId}: Props) {
	return (
		<Query query={GET_POOL} variables={{poolId}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Spinner/>;
				} 

				if (error) {
					console.log(JSON.stringify(error));
					return (
						<PoolView 
							pool={{ 
								poolName: 'The pool №123-8/15/18' 
							}}
						/>
					);
				}
				
				if (data && data.getPool) {
					return (
						<PoolView
							pool={data.getPool}
						/>
					);
				} else {
					return (
						<View>
							<Text>{`No data for pool with id: '${poolId}'`}</Text>
						</View>
					)
				}

			}}
		</Query>
	)
}

const GET_POOL = gql`
query Pool($poolId: ID!){
	getPool(poolId: $poolId) {
		poolName,
		status,
		ownerId,
		ownerName,
		projectName,
		projectAdress,
		poolSoftCap,
		poolHardCap,
		minDeposit,
		maxDeposit,
		endDate,
		ownerComission,
		iwComission
	}
}`;
