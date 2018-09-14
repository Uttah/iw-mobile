import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';
//import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Styles/MessageScreenStyles';
import { GiftedChat } from 'react-native-gifted-chat';
import { Images } from 'App/Themes';

type Props = {
	navigation: NavigationScreenProp<any, any>,
}

export default class MessagesScreen extends Component<Props> {
	state = {
    messages: [],
	};
	
	componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
	}
	
	onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
	}
	
	renderAvatar = () => {
		return (
			<Image
				source={Images.noAvatar}
				resizeMode={'contain'}
				style={styles.avatar}
			/> 
		);
	};

	render() {
		return (
			<Container>
				<GiftedChat
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
					}}
					renderAvatar={this.renderAvatar}
				/>
			</Container>
		);
	}
}

//export default connect()(MessagesScreen);