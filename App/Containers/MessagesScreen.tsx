import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessagesScreenStyles';
import Messages from '../Components/Messages';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class MessagesScreen extends Component<Props> {
	onReplyPress = () => {
		this.props.navigation.navigate('MessageScreen');
	}
 
	render() {
		const { userId } = this.props;
		const items = [
			{ id: '1', messagesNum: 3, author: 'Иван Фёдоров' },
			{ id: '2', messagesNum: 0, author: 'Елена Кукушкина' }
		];
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<Messages 
						userId={userId} 
						onReplyPress={this.onReplyPress}
						fakeItems={items}
					/>
				</ScrollView>
			</Container>
		);
	}
}

function mapStateToProps (state) {
	let obj = {
    userId: state.user.authUser.id
  };
	return obj;
}

export default connect(mapStateToProps)(MessagesScreen);