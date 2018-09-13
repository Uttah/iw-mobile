import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Tabs, Tab, TabHeading, Text, Fab, Button, Container } from 'native-base';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProfileTabs } from '../Services/Enums';

class ProfileScreen extends Component {
	state = {
		activeTab: ProfileTabs.Activity
	}
	
	onChangeTab = ({ i }) => {
		if (i == 0) {
			this.setState({
				activeTab: ProfileTabs.Activity
			});
		} else if (i == 1) {
			this.setState({
				activeTab: ProfileTabs.Portfolio
			});
		} else {
			this.setState({
				activeTab: ProfileTabs.About
			})
		}
	}
	
	onFabPress = (e) => {
		const activeTab = this.state.activeTab;
		if (activeTab == ProfileTabs.Activity) {
			alert('you want to add new post?');
		} else if (activeTab == ProfileTabs.Portfolio) {
			alert('you want to add portfolio?');
		} else {
			alert('you want to edit about me?');
		}
	}
	
	render() {
		const name = this.props.name;
		//нужна библиотека которая склоняет
		const stats = [
			{ text: 'подписчиков', number: 150 },
			{ text: 'подписан', number: 10 },
			{ text: 'поста', number: 73 },
		];
		const items = [
			{
				id: '1',
				name: 'forst'
			},
			{
				id: '2',
				name: 'second'
			}
		];
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<ProfileTop stats={stats} name={name}/>
					<Tabs onChangeTab={this.onChangeTab}>
						<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='newspaper-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Активность</Text></TabHeading>}>
							<ProfileTab1 items={items} />
						</Tab>
						<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='bar-chart-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Портфолио</Text></TabHeading>}>
							<ProfileTab2 />
						</Tab>
						<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='question-circle-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Обо мне</Text></TabHeading>}>
							<ProfileTab3 />
						</Tab>
					</Tabs>
				</ScrollView>
				<Fab
					direction='up'
					containerStyle={{ width: hp('8%'), height: hp('8%') }}
					style={{ backgroundColor: '#3f51b5', width: hp('8%'), height: hp('8%') }}
					position='bottomRight'
					onPress={this.onFabPress}>
					{this.state.activeTab == ProfileTabs.About ? <MaterialIcons name='edit' /> : <MaterialIcons name='add' />}
				</Fab>
			</Container>
		);
	}
}

function mapStateToProps (state) {
	let obj = {};
	obj.name = state.user.authUser.name;
	return obj;
}

export default connect(mapStateToProps)(ProfileScreen);