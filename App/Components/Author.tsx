import React, { Component, Fragment } from 'react';
import { TouchableHighlight, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from 'App/Themes';
import { Col, Grid } from 'react-native-easy-grid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles/AuthorStyles';

type Props = {
	style: any,
	author: string,
	date: string
};

export default class Author extends Component<Props> {
	render() {
		const { style, author } = this.props;
		return (
			<Grid style={[styles.bottomContainer, style]}>
				<Col style={{ width: wp('9.07%')}}>
					<TouchableHighlight style={styles.postAuthorAvatarWrap}>
						<Image
							source={Images.noAvatar}
							resizeMode={'contain'}
							style={styles.postAuthorAvatar}
						/>              
					</TouchableHighlight>
				</Col>
				<Col style={styles.authorNameCol}>
					<Text style={styles.postAuthor}>{author}</Text>
				</Col>
			</Grid>
		);
	}
}