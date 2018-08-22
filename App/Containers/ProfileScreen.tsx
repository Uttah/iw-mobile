import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Tabs, Tab, TabHeading, Icon, Text } from 'native-base';
import HeaderLogo from '../Components/HeaderLogo';
import ProfileTop from '../Components/ProfileTop';
import ProfileTab1 from '../Components/ProfileTab1';
import ProfileTab2 from '../Components/ProfileTab2';
import ProfileTab3 from '../Components/ProfileTab3';
import styles from './Styles/ProfileScreenStyles';
import { FontAwesome } from '@expo/vector-icons';

export default class ProfileScreen extends Component {
	static navigationOptions = {
		headerTitle: <HeaderLogo/>,
		headerRight: <View/>
	};

	render() {
		//нужна библиотека которая склоняет
		const stats = [
			{ text: 'подписчиков', number: 150 },
			{ text: 'подписан', number: 10 },
			{ text: 'поста', number: 73 },
		];
		return (
			<ScrollView style={styles.mainContainer}
			>
				<ProfileTop stats={stats}/>
				<Tabs>
          <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='newspaper-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Активность</Text></TabHeading>}>
            <ProfileTab1 />
          </Tab>
          <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='bar-chart-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Портфолио</Text></TabHeading>}>
            <ProfileTab2 />
          </Tab>
          <Tab heading={ <TabHeading style={{flexDirection: 'column'}}><FontAwesome name='question-circle-o' size={25} style={styles.tabicon}/><Text style={styles.tabname}>Обо мне</Text></TabHeading>}>
            <ProfileTab3 />
          </Tab>
        </Tabs>
			</ScrollView>
		);
	}
}