import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Author from '../Components/Author';
import ViewMoreText from 'react-native-view-more-text';
import { Col, Grid } from 'react-native-easy-grid';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/MessageItemStyles';

export default class MessageItem extends Component {
	renderViewMore = (onPress) => {
		return(
			<Grid style={styles.btns}>
				<Col style={{ width: hp('10%')}}>
					<TouchableOpacity style={styles.btn} onPress={this.props.onReplyPress}>
						<FontAwesome active name='reply' color={'#5A6978'} size={hp('2.25%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Reply</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('10%')}}>
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
				<Col style={{ width: hp('10%')}}>
					<TouchableOpacity style={styles.btn} onPress={this.props.onReplyPress}>
						<FontAwesome active name='reply' color={'#5A6978'} style={styles.btnicon}/>
						<Text style={styles.btntext}>Reply</Text>
					</TouchableOpacity>
				</Col>
				<Col style={{ width: hp('10%')}}>
					<TouchableOpacity style={styles.btn} onPress={onPress}>
						<MaterialCommunityIcons active name='eye-off' color={'#5A6978'} style={styles.btnicon}/>
						<Text style={styles.btntext}>Hide</Text>
					</TouchableOpacity>
				</Col>
		</Grid>
		)
	};

	render() {
		const { id, messagesNum, author } = this.props.item;
		const onPress = this.props.onPress;

		return (
			<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.inner}>
					<Author 
						style={styles.author} 
						author={author} 
						date={{}}
						authorNameStyle={styles.authorName}
						messagesNum={messagesNum}
					/>
					<View style={styles.time}><Text style={styles.timeText}>6:19 PM</Text></View>
					<View style={styles.viewmore}>
						<ViewMoreText
							numberOfLines={1}
							renderViewMore={this.renderViewMore}
							renderViewLess={this.renderViewLess}
						>
							<Text style={styles.text}>
								Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
							</Text>
						</ViewMoreText>
					</View>
        </View>
			</TouchableOpacity>
		);
	}
}