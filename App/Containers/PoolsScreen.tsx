import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, PixelRatio } from 'react-native';
import { Text, Spinner } from 'native-base';
import ControlPanel from '../Components/ControlPanel';
import PoolItem from '../Components/PoolItem';
import { Tabs, Tab, TabHeading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import HeaderLogo from '../Components/HeaderLogo';
import { loadPoolsAsync } from '../Redux/PoolsRedux';
import styles from './Styles/PoolsScreenStyles';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class PoolsScreen extends Component<Props> {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};

	state = {
		showInput: false,
		filterStr: ''
	};

	componentDidMount() {
		const dispatch = this.props.dispatch;
		dispatch(loadPoolsAsync());
	}

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
			fetching
		} = this.props;

		return (
			<KeyboardAwareScrollView
				style={styles.mainContainer}  
				enableOnAndroid={true}
			>
				<Text style={styles.headerTitle}>Пулы</Text>
				{ fetching ? <Spinner/> : null }
				<ControlPanel 
					showInput = {this.state.showInput}
					onChange = {this.toggleSearch}
					searchStr = {this.state.filterStr}
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
			</KeyboardAwareScrollView>
		);
	}
}

function mapStateToProps (state) {
	let keys = ['fetching', 'popular', 'created', 'invested', 'filtered'],
		obj = {};
	keys.map((key) => obj[key] = state.pools[key]);
	return obj;
}

export default connect(mapStateToProps)(PoolsScreen);