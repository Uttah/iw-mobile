import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import styles from './Styles/SocialStatsStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SocialStats extends Component {
	static defaultProps: {
		style: {}
	};

	render() {
    const { likes, comments, shares, style } = this.props;
		return (
			<Grid style={style}>
				<Col style={{ width: hp('5.9%')}}>
					<TouchableOpacity onPress={() => alert('you pressed likes')} style={styles.btn}>
						<FontAwesome active name='heart-o' color={'#474747'} size={hp('3%')} style={[styles.icon, styles.iconLike]}/>
						<Text style={styles.text}>{likes}</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('5.9%')}}>
					<TouchableOpacity onPress={() => alert('you pressed comments')} style={styles.btn}>
						<MaterialIcons active name='comment' color={'#474747'} size={hp('3%')} style={[styles.icon, styles.iconComment]}/>
						<Text style={styles.text}>{comments}</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('5.9%')}}>
					<TouchableOpacity onPress={() => alert('you pressed shares')} style={styles.btn}>
						<FontAwesome active name='retweet' color={'#474747'} size={hp('3%')} style={[styles.icon, styles.iconRetweets]}/>
						<Text style={styles.text}>{shares}</Text>
					</TouchableOpacity>
				</Col>
			</Grid>
		);
	}
}