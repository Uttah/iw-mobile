import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, Image } from 'react-native';
import styles from './Styles/DrawerContentStyles';
import { Images } from 'App/Themes';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationsCircle from './NotificationsCircle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../Services/MyApi';
import UserActions from '../Redux/UserRedux';
import { connect } from 'react-redux';

class DrawerContent extends Component {
	
	navigateToScreen = (route) => (() => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	});

	logOut = async () => {
		const { dispatch } = this.props;
		const response = await api.logOut();
		console.log(response);
		dispatch(UserActions.clearLogin());
		this.navigateToScreen('LaunchScreen')();
	}
		
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.logoWrap}>
						<Image
							source={Images.icoWorldLogo}
							style={styles.logo}
							resizeMode={'contain'}
						/>
					</View>
				</View>
				<View style={styles.screenContainer}>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<FontAwesome active name='user' color={'#474747'} size={hp('3.6%')} style={styles.iconUser}/>
						</View>
						<Text onPress={this.navigateToScreen('ProfileScreen')}>Profile</Text>
					</View>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<FontAwesome active name='group' color={'#474747'} size={hp('3.6%')} style={styles.iconGroup}/>
						</View>
						<Text onPress={this.navigateToScreen('PoolsScreen')}>Pools</Text>
					</View>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<MaterialIcons active name='comment' color={'#474747'} size={hp('3.6%')} style={styles.iconComment}/>
							<NotificationsCircle style={styles.hasNew}/>
						</View>
						<Text onPress={this.navigateToScreen('MessagesScreen')}>Messages</Text>
					</View>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<MaterialIcons active name='people' color={'#474747'} size={hp('3.6%')} style={styles.iconNotificationsActive}/>
						</View>
						<Text onPress={this.navigateToScreen('InvestorsScreen')}>Investors</Text>
					</View>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<MaterialIcons active name='notifications-active' color={'#474747'} size={hp('3.6%')} style={styles.iconNotificationsActive}/>
							<NotificationsCircle style={styles.hasNew}/>
						</View>
						<Text onPress={this.navigateToScreen('NotificationsScreen')}>Notifications</Text>
					</View>
					<View style={styles.screenStyle}>
						<View style={styles.iconWrap}>
							<MaterialCommunityIcons active name='logout-variant' color={'#474747'} size={hp('3.6%')} style={styles.iconLogout}/>
						</View>
						<Text onPress={this.logOut}>Log out</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default connect()(DrawerContent);