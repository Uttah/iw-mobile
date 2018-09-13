import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { Images } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/PoolItemStyles';

export default class PoolItem extends Component {
	render() {
		const { id, number, name, date, comiss, author } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.name}>{name}</Text>
					<Text style={styles.comiss}>Общая комиссия: {comiss}%</Text>
					{/* to do? вынести в общий компонент? еще и в постах profile page */}
					<Grid style={styles.bottomContainer}>
						<Col style={{ width: wp('9.07%')}}>
							<TouchableHighlight style={styles.postAuthorAvatarWrap}>
								<Image
									source={Images.noAvatar}
									resizeMode={'contain'}
									style={styles.postAuthorAvatar}
								/>              
							</TouchableHighlight>
						</Col>
						<Col>
							<Text style={styles.postAuthor}>{author} {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
						</Col>
					</Grid>
        </View>
			</TouchableOpacity>
		);
	}
}