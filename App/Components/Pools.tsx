import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ControlPanel from '../Components/ControlPanel';
import PoolItem from '../Components/PoolItem';
import { Tabs, Tab, TabHeading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import PoolsActions from '../Redux/UserRedux';
import styles from './Styles/PoolsStyles';

export default class Pools extends Component {
	state = {
		showInput: false
	};

	onSearchStrChange = (text) => {
		//const dispatch = this.props.dispatch;
		//dispatch(updateFilterStr(text));
		//dispatch(loadFilteredItems(text));
	}

	toggleSearch = () => {
		// const dispatch = this.props.dispatch;
		// dispatch(updateFilterStr(''));
		this.setState({
			showInput: !this.state.showInput
		});
	}

	onChangeTab = ({ i }) => {
		console.log(i);
	}
	
	renderItem = ({ item }) => {
		return (
			<PoolItem item={item} />
		);
	};
	
	render() {
		const {
			popular,
			created,
			invested,
			filtered, 
			filterStr
		} = this.props;
		
		return (
			<View>
				<ControlPanel 
					showInput = {this.state.showInput}
					onChange = {this.toggleSearch}
					searchStr = {filterStr}
					onSearchStrChange = {this.onSearchStrChange}
				/>
				<Tabs onChangeTab={this.onChangeTab}>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='whatshot' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Популярные</Text></TabHeading>}>
						<FlatList
							data={popular}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='money-off' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Я инвестировал</Text></TabHeading>}>
						<FlatList
							data={invested}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
					<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><MaterialIcons name='attach-money' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Я создал</Text></TabHeading>}>
						<FlatList
							data={created}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
						/>
					</Tab>
				</Tabs>
			</View>
		);
	}
}