import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Button } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/CommentsScreenStyles';
import CommentItem from '../Components/CommentItem';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RootActions from '../Redux/RootRedux';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

class CommentsScreen extends Component<Props> {
	onPress = () => {
		this.props.dispatch(RootActions.showCommentsModal());
	}

	renderItem = ({ item }) => {
		return (
			<CommentItem item={item} onPress={this.onPress}/>
		);
	};

	listTop = () => {
		return (
			<View style={{ borderWidth: 1, borderColor: 'rgba(178, 178, 178, 0.5)', height: hp('9.29%'), flex: 1 }}>
				<Text style={styles.headerTitle}>Comments</Text>
			</View>
		);
	}
 
	render() {
		const items = [
			{ 
				id: '1', 
				author: 'Stella Johnson', 
				content: 'has recently posted an album', 
				time: '6:19 PM'
			},
			{ 
				id: '2', 
				author: 'Alex Brown', 
				content: "has shared Martin Guptil's post", 
				time: '8:44 AM'
			},
			{ 
				id: '3', 
				author: 'Domnic Brown', 
				content: "has sent you a group invitation for Global Health", 
				time: '2:23 PM'
			},
			{ 
				id: '4', 
				author: 'John Smith', 
				content: "has birthday today", 
				time: '5:55 AM'
			}
		];
		return (
			<Container>
				<ScrollView style={styles.mainContainer}>
					<FlatList
						data={items}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={this.listTop()}
					/>
				</ScrollView>
				<Button 
					full 
					primary 
					style={styles.button} 
					disabled={false} 
					onPress={this.onPress}
				>
					<Text uppercase={false} style={styles.buttonText}>Comment</Text>
				</Button> 
			</Container>
		);
	}
}

export default connect()(CommentsScreen);