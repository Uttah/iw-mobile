import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Tabs, Tab, TabHeading, Text, Fab, Button, Container } from 'native-base';
import HeaderLogo from '../Components/HeaderLogo';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProfileTabs } from '../Services/Enums';

export default class ProfileScreen extends Component {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};
	
	state = {
		activeTab: ProfileTabs.Activity
	}

	render() {
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
					<ProfileTop stats={stats}/>
					<Tabs onChangeTab={(tab) => alert('you changed tab! ')}>
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
					onPress={() => alert('you pressed fab!')}>
					{/* <MaterialIcons name='edit' /> */}
					<MaterialIcons name='add' />
				</Fab>
			</Container>
		);
	}
}