import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { ListItem, List, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/ProfileTab3Styles';
import { FontAwesome } from '@expo/vector-icons';

export default class ProfileTab3 extends Component {
	render() {
		return (
			<List>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Обо мне</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</Text>
					</View>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Соцсети</Text>
					</View>
					<View style={[styles.listItemInner, styles.socIcons]}>
						<TouchableHighlight>
							<FontAwesome name='facebook-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableHighlight>
						<TouchableHighlight>
							<FontAwesome name='linkedin-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableHighlight>
						<TouchableHighlight>
							<FontAwesome name='twitter-square' size={hp('3.97%')} style={styles.socIcon}/>
						</TouchableHighlight>
					</View>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Образование</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>Казанский Политех</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={[styles.listItemText, styles.listItemFollow]}>2011—2015</Text>
					</View>
				</ListItem>
				<ListItem noIndent style={styles.listItem}>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemTitle}>Опыт работы</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>Alpha Bank, Corporate Department</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={[styles.listItemText, styles.listItemFollow]}>2011—2015</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={styles.listItemText}>Sberbank, Corporate Department</Text>
					</View>
					<View style={styles.listItemInner}>
						<Text style={[styles.listItemText, styles.listItemFollow]}>2015—2018</Text>
					</View>
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