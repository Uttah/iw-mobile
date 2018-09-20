import React, { Component } from 'react';
import { Modal, View, TouchableHighlight } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import RootActions from '../Redux/RootRedux';
import TextField from './TextField';
import styles from './Styles/CommentsModalDialogStyles';
import { TextFieldStatus } from '../Services/Enums';

class CommentsModalDialog extends Component {
		onPress = () => {
			console.log('ha');
		}

		state = {
			comment: '',
			commentError: ''
		};

		onFieldChange = (fieldName, val) => {
			console.log('field changed');
		};
		
		getFieldStatus = (fieldName) => {
			return TextFieldStatus.NotChecked;
		}

    render() {
        const {
          dispatch
        } = this.props;
        return (
					<Modal 
						transparent={true}
						visible={true}
						onRequestClose={() => {console.log('ha')}}>
						<View style={styles.container}>
							<View style = {styles.modal}>
								<View style={styles.modalinner}>
									<Text style = {styles.title}>Comment</Text>
									<TextField 
										style={styles.input}
										fieldStatus={this.getFieldStatus('comment')}
										placeholder=''
										value={this.state.comment}
										onChangeText={(val) => this.onFieldChange('comment', val)}
										error={this.state.commentError}
										showError={true}
										returnKeyType={'done'}
									/>
									<View style={styles.btns}>
										<TouchableHighlight style={[styles.btn, styles.btnleft]} onPress = {() => {dispatch(RootActions.hideCommentsModal());}}>                            
												<Text style = {[styles.text, styles.btntext]}>CANCEL</Text>
										</TouchableHighlight>
										<TouchableHighlight style={styles.btn} onPress = {() => {this.onPress();dispatch(RootActions.hideCommentsModal());}}>              
												<Text style = {[styles.text, styles.btntext, styles.btnright]}>COMMENT</Text>
										</TouchableHighlight>
									</View>
								</View>
							</View>
						</View>
					</Modal>
        );
    }
}

export default connect()(CommentsModalDialog);