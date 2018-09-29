import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Author from './Author';
import ViewMoreText from './ViewMoreText';
import { Col, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/MessageItemStyles';

export default class MessageItem extends Component {
	renderViewMore = (onPress) => {
		return(
			<Grid style={styles.btns}>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start'}}>
					<TouchableOpacity style={styles.btn} onPress={this.props.onMessagePress}>
						<FontAwesome active name='reply' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Reply</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start'}}>
					<TouchableOpacity style={styles.btn} onPress={onPress}>
						<MaterialCommunityIcons active name='eye' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Read</Text>
					</TouchableOpacity>
				</Col>
		</Grid>
		)
	};

	renderViewLess = (onPress) => {
		return(
			<Grid style={styles.btns}>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start' }}>
					<TouchableOpacity style={styles.btn} onPress={this.props.onMessagePress}>
						<FontAwesome active name='reply' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Reply</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start' }}>
					<TouchableOpacity style={styles.btn} onPress={onPress}>
						<MaterialCommunityIcons active name='eye-off' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Hide</Text>
					</TouchableOpacity>
				</Col>
		</Grid>
		)
	};

	renderDefault = () => {
		return(
			<Grid style={styles.btns}>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start' }}>
					<TouchableOpacity style={styles.btn} onPress={this.props.onMessagePress}>
						<FontAwesome active name='reply' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Reply</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('10%'), alignItems: 'flex-start' }}>
				</Col>
		</Grid>
		)
	};

	render() {
		const { id, lastMessage, parnter } = this.props.item;
		const onPress = this.props.onMessagePress;
		const date = new Date(lastMessage.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
					<Author 
						style={styles.author} 
						author={parnter.name} 
						date={{}}
						authorNameStyle={styles.authorName}
						messagesNum={0}
					/>
					<View style={styles.time}><Text style={styles.timeText}>{date}</Text></View>
					<View style={styles.viewmore}>
						<ViewMoreText
							numberOfLines={1}
							renderViewMore={this.renderViewMore}
							renderViewLess={this.renderViewLess}
							renderDefault={this.renderDefault}
						>
							<Text style={styles.text}>
								{lastMessage.content}
							</Text>
						</ViewMoreText>
					</View>
        </View>
			</TouchableOpacity>
		);
	}
}