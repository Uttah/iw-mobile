import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { View, ScrollView } from 'react-native';
import { Text, Spinner, Container, Fab } from 'native-base';
import ControlPanel from '../Components/ControlPanel';
import PoolItem from '../Components/PoolItem';
import { Tabs, Tab, TabHeading } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { loadPoolsAsync, loadPoolsFilteredAsync } from '../Redux/PoolsRedux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/PoolsScreenStyles';
import FilteredPools from '../Components/FilteredPools';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class PoolsScreen extends Component<Props> {
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
      <PoolItem item={item} onPress={this.onPoolPress} />
    );
  };
  
  onPoolPress = (id) => {
    console.log(id); //replace id when backend is ready
    this.props.navigation.navigate('PoolScreen', { id: "5b87826b26229f0026661f1e" });
  }

  //to do: вместо onSearchPoolPress, onPoolPress только одна функция
  onSearchPoolPress = (id) => {
    this.props.navigation.navigate('PoolScreen', { id });
  }

  onFabPress = () => {
    this.props.navigation.navigate('PoolAddScreen');
  }
  
  render() {
    const {
      popular,
      created,
      invested,
      filtered,
      fetching
    } = this.props;
    
    return (
      <Container>
        <ScrollView style={styles.mainContainer}>
          <Text style={styles.headerTitle}>Пулы</Text>
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
            <FilteredPools poolName={this.state.filterStr} onPress={this.onSearchPoolPress}/>
          }
        </ScrollView>
        <Fab
          direction='up'
          containerStyle={{ width: hp('8%'), height: hp('8%') }}
          style={{ backgroundColor: '#3f51b5', width: hp('8%'), height: hp('8%') }}
          position='bottomRight'
          onPress={this.onFabPress}>
        <MaterialIcons name='add' />
        </Fab>
      </Container>
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