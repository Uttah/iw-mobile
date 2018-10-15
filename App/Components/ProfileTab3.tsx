import React, { Component } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { ListItem, List, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/ProfileTab3Styles';
import { FontAwesome } from '@expo/vector-icons';

const engagementView = (engagement) => {
	let { from, to } = engagement;
	from = (new Date(from)).getFullYear();
	to = (new Date(to)).getFullYear();

	//wtf _id
	return (
		<View key={engagement._id}>
			<View style={styles.listItemInner}>
				<Text style={styles.listItemText}>{engagement.name}</Text>
			</View>
			<View style={styles.listItemInner}>
				<Text style={[styles.listItemText, styles.listItemFollow]}>{from}-{to}</Text>
			</View>
		</View>
	);
};

const guid = ()  =>{
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default class ProfileTab3 extends Component {
	render() {
		const { about, clinks, educations, jobs } = this.props;
		return (
			<List>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Обо мне</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>{about}</Text>
					</View>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Соцсети</Text>
					</View>
					{(clinks.fb.length > 0 || clinks.linkedin.length > 0 || clinks.twitter.length > 0) && <View style={[styles.listItemInner, styles.socIcons]}>
						{clinks.fb.length > 0 && <TouchableOpacity key={guid()} style={styles.socBtn} onPress={() => Linking.openURL('https://facebook.com/' + clinks.fb)}>
							<FontAwesome name='facebook-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
						{clinks.linkedin.length > 0 && <TouchableOpacity key={guid()} style={styles.socBtn} onPress={() => Linking.openURL('https://www.linkedin.com/in/' + clinks.linkedin)}>
							<FontAwesome name='linkedin-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
						{clinks.twitter.length > 0 && <TouchableOpacity key={guid()} onPress={() => Linking.openURL('https://twitter.com/' + clinks.twitter)}>
							<FontAwesome name='twitter-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
					</View>}
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Образование</Text>
					</View>
					{educations.length > 0 && educations.map((education) => engagementView(education))}
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Опыт работы</Text>
					</View>
					{jobs.length > 0 && jobs.map((job) => engagementView(job))}
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Язык</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>Русский, Английский</Text>
					</View>
				</ListItem>
			</List>			
		);
	}
}