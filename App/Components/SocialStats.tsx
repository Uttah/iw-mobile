import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import styles from './Styles/SocialStatsStyles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

export default class SocialStats extends Component {
	static defaultProps: {
		style: {}
	};

	state = {
		liked: false
	};

	onPressLike = () => {
		this.setState({
			liked: !this.state.liked
		})
	}

	render() {
    const { likes, comments, shares, style, onCommentsPress } = this.props;
		return (
			<Grid style={style}>
				<Col style={{ width: hp('6.1%')}}>
					<TouchableOpacity onPress={this.onPressLike} style={styles.btn}>
						<FontAwesome active name={this.state.liked ? 'heart' : 'heart-o'} color={this.state.liked ? Colors.notifications : '#474747'} size={hp('3%')} style={[styles.icon, styles.iconLike]}/>
						<Text style={styles.text}>{likes}</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('6.1%')}}>
					<TouchableOpacity onPress={onCommentsPress} style={styles.btn}>
						<MaterialIcons active name='comment' color={Colors.brandPrimary} size={hp('3%')} style={[styles.icon, styles.iconComment]}/>
						<Text style={styles.text}>{comments}</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('6.1%')}}>
					<TouchableOpacity onPress={() => alert('you pressed shares')} style={styles.btn}>
						<FontAwesome active name='retweet' color={Colors.brandPrimary} size={hp('3%')} style={[styles.icon, styles.iconRetweets]}/>
						<Text style={styles.text}>{shares}</Text>
					</TouchableOpacity>
				</Col>
			</Grid>
		);
	}
}