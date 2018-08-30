import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import { Text, Spinner } from 'native-base';
import ControlPanel from '../Components/ControlPanel';
import PoolItem from '../Components/PoolItem';
import { Tabs, Tab, TabHeading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import HeaderLogo from '../Components/HeaderLogo';
import { loadPoolsAsync, loadPoolsFilteredAsync } from '../Redux/PoolsRedux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/PoolsScreenStyles';
import Pool from '../Components/Pool';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class PoolsScreen extends Component<Props> {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};

	state = {
		filterStr: '',
		searchPressed: false
	};

	componentDidMount() {
		const dispatch = this.props.dispatch;
		dispatch(loadPoolsAsync());
	}

	onSearchStrChange = (text) => {
		this.setState({
			filterStr: text,
			searchPressed: false
		});
	}

	toggleSearch = () => {
		this.setState({
			filterStr: '',
			searchPressed: false
		});
	}

	searchSubmit = () => {
		this.setState({
			searchPressed: true
		});
		const dispatch = this.props.dispatch;
		dispatch(loadPoolsFilteredAsync(this.state.filterStr));
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
				<Pool/>
				<View style={{height: hp('7.27%')}}>
					<ControlPanel 
						onChange={this.toggleSearch}
						searchStr={this.state.filterStr}
						onSearchStrChange={this.onSearchStrChange}
						searchSubmit={this.searchSubmit}
					/>
				</View>
				{ fetching ? <Spinner/> : null }
				{!this.state.searchPressed && <Tabs onChangeTab={this.onChangeTab}>
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
				</Tabs>}
				{ this.state.searchPressed && !fetching &&
					<View>
						<Text style={styles.headerSubTitle}>Результаты поиска</Text>
						<FlatList
							data={filtered}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
							style={styles.filtered}
						/>
					</View> 
				}
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