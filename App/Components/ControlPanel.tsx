import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Item, Input, Grid, Col } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import styles from './Styles/ControlPanelStyles';

export default class ControlPanel extends Component {
	static defaultProps = { showInput: false }
	
	showInput = (searchStr, onSearchStrChange) => {
		return (
			<View style={styles.input}>
				<Item>
					<Input 
						placeholder = '' 
						value = {searchStr}
						onChangeText = {onSearchStrChange}
						style={styles.inputField}
					/>
					<TouchableOpacity style={styles.close} onPress={this.onPressClose}>
						<EvilIcons active name='close' size={26} color={'#d0d0d0'}/>
					</TouchableOpacity>
				</Item>
			</View>
		);
	}
	
	onPressClose = () => {
		this.props.onChange({ btn: 'close' });
	}
	
	onPressSearch = () => {
		this.props.onChange({ btn: 'search' });
	}
	
	render () {
		const {
			showInput,
			onChange,
			searchStr,
			onSearchStrChange
		} = this.props;
		
		return (
			<View style={styles.panel}>
				<Grid style={styles.panelInner}>
					<Col style={styles.left}>
						<TouchableOpacity onPress={this.onPressSearch}>
							<EvilIcons name='search' style={styles.searchIcon} size={26} color={'#999'}/>
						</TouchableOpacity>
					</Col>
					{showInput && this.showInput(searchStr, onSearchStrChange)}
				</Grid>
			</View>
		);
	}
}