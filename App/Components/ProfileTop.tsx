import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import styles from './Styles/ProfileTopStyles';
import StatsNumbers from './StatsNumbers';
import { Images } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export default class ProfileTop extends Component {

	render() {
		const { stats, user, ownPage, onEditPress, onChatPress } = this.props;
		return (
			<View style={styles.outer}>
				<View style={styles.container}>
					<TouchableHighlight style={styles.avatarWrap}>
						<Image
							source={Images.noAvatar}
							resizeMode={'contain'}
							style={styles.avatar}
						/>
					</TouchableHighlight>
					<View style={styles.avatarRight}>
						<StatsNumbers style={styles.numbers} stats={stats}/>
						{
							ownPage ?
							<TouchableOpacity style={styles.btn} onPress={onEditPress}>
								<MaterialIcons active name='edit' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
								<Text style={styles.btntext}>Edit profile</Text>
							</TouchableOpacity>
							:
							<View style={styles.btns}>
								<TouchableOpacity style={styles.btn} onPress={onChatPress}>
									<Entypo active name='chat' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
									<Text style={styles.btntext}>Message</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.btn} onPress={() => {}}>
									<MaterialIcons active name='add-circle-outline' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
									<Text style={styles.btntext}>Follow</Text>
								</TouchableOpacity>
							</View>
						}
					</View>
				</View>
				<Text style={styles.author}>{user.name}</Text>
				<Text style={styles.nickname}>@{user.login}</Text>
			</View>
		);
	}
}