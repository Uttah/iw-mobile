import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ControlPanel from '../Components/ControlPanel';
import PoolItem from '../Components/PoolItem';
import { Tabs, Tab, TabHeading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import styles from './Styles/PoolsStyles';

export default class Pools extends Component {
	onChangeTab = ({ i }) => {
		console.log(i);
	}
	
	renderItem = ({ item }) => {
		return (
			<PoolItem item={item} />
		);
	};
	
	render() {
		const items = [
			{
				id: '1',
				number: '123-8/15/18',
				name: 'Tether',
				date: '25 декабря 2017',
				comiss: 3,
				author: 'Владислава Константиновна Карамагомедовна-Фазыльоглы'
			},
			{
				id: '2',
				number: '123-8/15/19',
				name: 'Hether',
				date: '26 декабря 2017',
				comiss: 3,
				author: 'Иван Фёдоров'
			}
		];
		const items2 = [
			{
				id: '3',
				number: '123-8/15/19',
				name: 'Mether',
				date: '25 декабря 2016',
				comiss: 3,
				author: 'Владислава Карамагомедовна-Фазыльоглы'
			},
			{
				id: '4',
				number: '123-8/15/20',
				name: 'Fether',
				date: '26 декабря 2014',
				comiss: 3,
				author: 'Сергей Зверев'
			}
		];
		const items3 = [
			{
				id: '5',
				number: '123-8/16/44',
				name: 'Ketether',
				date: '25 декабря 2016',
				comiss: 3,
				author: 'Иван Федоров'
			},
			{
				id: '6',
				number: '123-8/16/45',
				name: 'Pethether',
				date: '26 декабря 2014',
				comiss: 3,
				author: 'Иван Федоров'
			}
		];		
		return (
			<View>
				<ControlPanel />
				<Tabs onChangeTab={this.onChangeTab}>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='whatshot' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Популярные</Text></TabHeading>}>
						<FlatList
							data={items}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='money-off' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Я инвестировал</Text></TabHeading>}>
						<FlatList
							data={items2}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='attach-money' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Я создал</Text></TabHeading>}>
						<FlatList
							data={items3}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
				</Tabs>
			</View>
		);
	}
}