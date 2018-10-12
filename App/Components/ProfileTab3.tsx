import React, { Component } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { ListItem, List, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/ProfileTab3Styles';
import { FontAwesome } from '@expo/vector-icons';

const engagementView = (education) => {
	let { from, to } = education;
	from = (new Date(from)).getFullYear();
	to = (new Date(to)).getFullYear();

	return (
		<View key={education.id}>
			<View style={styles.listItemInner}>
				<Text style={styles.listItemText}>{education.name}</Text>
			</View>
			<View style={styles.listItemInner}>
				<Text style={[styles.listItemText, styles.listItemFollow]}>{from}-{to}</Text>
			</View>
		</View>
	);
};

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
					<View style={[styles.listItemInner, styles.socIcons]}>
						{clinks.fb.length && <TouchableOpacity style={styles.socBtn} onPress={() => Linking.openURL('https://facebook.com/' + clinks.fb)}>
							<FontAwesome name='facebook-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
						{clinks.linkedin.length && <TouchableOpacity style={styles.socBtn} onPress={() => Linking.openURL('https://www.linkedin.com/in/' + clinks.linkedin)}>
							<FontAwesome name='linkedin-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
						{clinks.twitter.length && <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/' + clinks.twitter)}>
							<FontAwesome name='twitter-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableOpacity>}
					</View>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Образование</Text>
					</View>
					{educations.length && educations.map((education) => engagementView(education))}
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Опыт работы</Text>
					</View>
					{jobs.length && jobs.map((job) => engagementView(job))}
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