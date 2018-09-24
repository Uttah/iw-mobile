import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/InvestorItemStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default class InvestorItem extends Component {

	render() {
		const { id, name, login, countOfFollowers } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
				<View style={styles.inner}>
					<TouchableHighlight style={styles.avatarWrap}>
						<Image
							source={Images.noAvatar}
							resizeMode={'contain'}
							style={styles.avatar}
						/>
					</TouchableHighlight>
					<TouchableOpacity 
						style={styles.button} 
						disabled={false} 
						onPress={onPress}
					>
						<Text uppercase={false} style={styles.buttonText}>Follow</Text>
						<MaterialIcons active name='add-circle-outline' color={'#fff'} size={hp('2.25%')} style={styles.btnicon}/>
					</TouchableOpacity> 
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.login}>@login</Text>
					<Text style={styles.subscribers}>{countOfFollowers} subscribers</Text>
				</View>
			</TouchableOpacity>
		);
	}
}