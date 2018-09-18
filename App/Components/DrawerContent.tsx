import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, Image } from 'react-native';
import styles from './Styles/DrawerContentStyles';
import { Images } from 'App/Themes';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NotificationsCircle from './NotificationsCircle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class DrawerContent extends Component {
	
	navigateToScreen = (route) => (() => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	});
		
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
							<MaterialIcons active name='notifications-active' color={'#474747'} size={hp('3.6%')} style={styles.iconNotificationsActive}/>
							<NotificationsCircle style={styles.hasNew}/>
						</View>
						<Text onPress={this.navigateToScreen('NotificationsScreen')}>Notifications</Text>
					</View>
				</View>
			</View>
		);
	}
}