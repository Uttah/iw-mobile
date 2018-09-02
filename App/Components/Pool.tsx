import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { List, ListItem, Text } from 'native-base';
import gql from 'graphql-tag';
import styles from './Styles/PoolStyles';
import moment from 'moment';
//import 'moment/locale/ru';

type Props = {
	poolId: number,
};

const PoolView = ({pool}) => (
	<View>
		<Text style={styles.poolName}>Пул {pool.poolName}</Text>
		<List>
			{/* fix странного бага с первым элементом списка с noIndent */}
			<ListItem noIndent style={styles.listItem}></ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Open code of smart-contract of the pool</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.verifyContractLink}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Project</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>Project</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Address of the project</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.projectAdress}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Soft Cap of the pool</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.poolSoftCap}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Hard Cap of the pool</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.poolHardCap}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Min deposit per participant</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.minDeposit}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Max deposit per participant</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.maxDeposit}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Date of the end</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{moment(pool.endDate).format('D MMM YYYY')}</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Comission of pool's holder</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.comissionOfHolder}%</Text>
				</View>
			</ListItem>
			<ListItem noIndent style={styles.listItem}>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemTitle}>Comission of icoWorld</Text>
				</View>
				<View style={styles.listItemInner}>
					<Text style={styles.listItemText}>{pool.comissionOfIcoWorld}%</Text>
				</View>
			</ListItem>
		</List>
	</View>
);

export default function Pool({poolId}: Props) {
	return (
		<Query query={GET_POOL} variables={{poolId}}>
			{({ loading, error, data }) => {
				if (loading) {
					return <Text>Loading</Text>;
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
				
				if (data) {
					debugger;
					return (
						<PoolView
							pool={data.getPool}
						/>
					);
				}

			}}
		</Query>
	)
}

const GET_POOL = gql`
query Pool($poolId: ID!){
	getPool(poolId: $poolId) {
		poolName,
		verifyContractLink,
		projectName,
		projectAdress,
		poolSoftCap,
		poolHardCap,
		minDeposit,
		maxDeposit,
		endDate,
		comissionOfHolder,
		comissionOfIcoWorld
	}
}`;
