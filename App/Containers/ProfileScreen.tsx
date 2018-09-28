import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView , View } from 'react-native';
import { Tabs, Tab, TabHeading, Text, Fab, Container, Spinner } from 'native-base';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProfileTabs } from '../Services/Enums';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { GET_USER } from '../Services/Graphql';

class ProfileScreen extends Component {
	state = {
		activeTab: ProfileTabs.Activity
	}

	onChatPress = (id) => {
		this.props.navigation.navigate('MessageScreen', { partnerId: id });
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

	onCommentsPress = () => {
		this.props.navigation.navigate('CommentsScreen');
	}
	
	render() {
		let ownPage:boolean;
		let id:string;

		if (typeof(this.props.navigation.state.params) !== 'undefined') {
			ownPage = false;
			id = this.props.navigation.state.params.id;
		}
		else {
			ownPage = true;
			id = this.props.authUser.id;
		}
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
			<Query query={GET_USER} variables={{userId: id}}>
				{({ loading, error, data }) => {
					if (loading) {
						return (<View><Spinner/></View>);
					} 
					if (error) {
						console.log(JSON.stringify(error));
						return (
							<View><Text>{error}</Text></View>
						);
					}
					if (data && data.getUser) {
						return (
							<Container>
								<ScrollView style={styles.mainContainer}>
									<ProfileTop stats={stats} user={data.getUser} ownPage={ownPage} onChatPress={() => this.onChatPress(id)}/>
									<Tabs onChangeTab={this.onChangeTab}>
										<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='newspaper-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Активность</Text></TabHeading>}>
											<ProfileTab1 items={items} onCommentsPress={this.onCommentsPress}/>
										</Tab>
										<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='bar-chart-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Портфолио</Text></TabHeading>}>
											<ProfileTab2 />
										</Tab>
										<Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='question-circle-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Обо мне</Text></TabHeading>}>
											<ProfileTab3 />
										</Tab>
									</Tabs>
								</ScrollView>
								{ownPage && <Fab
									direction='up'
									containerStyle={{ width: hp('8%'), height: hp('8%') }}
									style={{ backgroundColor: '#3f51b5', width: hp('8%'), height: hp('8%') }}
									position='bottomRight'
									onPress={this.onFabPress}>
									{this.state.activeTab == ProfileTabs.About ? <MaterialIcons name='edit' /> : <MaterialIcons name='add' />}
								</Fab>}
						</Container>
						);
					} else {
						return (
							<View><Text>{`No data for user with id: '${id}'`}</Text></View>
						);
					}
				}}
			</Query>
		);
	}
}

function mapStateToProps (state) {
	let obj = {};
	obj.authUser = state.user.authUser;
	return obj;
}

export default connect(mapStateToProps)(ProfileScreen);