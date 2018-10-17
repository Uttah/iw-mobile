import React, { Component } from 'react';
import { Text, Accordion } from 'native-base';
import { View, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './Styles/EditProfileStyles';
import { Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import AccordInputField from './AccordInputField';
import TextareaField from './TextareaField';
import _validate from '../Services/Validator';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';

const validate = values => {
	const error = {};
	error.name = _validate('name', values.name);
	error.login = _validate('name', values.login);
	return error;
};

type Props = any;

const editProfileItemsList = (items, onDelete, onEdit) => {
	return (
		<FlatList
			data={items.map(function(item) {
				return { ...item, onDelete, onEdit }
			})}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

const renderItem = ({ item }) => {
	let { from, to } = item;
	from = (new Date(from)).getFullYear();
	to = (new Date(to)).getFullYear();

	return (
		<View style={styles.editProfileItem}>
			<View style={[styles.editProfileItemTextWrap, styles.editProfileItemTextWrapFirst]}>
				<Text style={styles.editProfileItemText}>{item.name}</Text>
			</View>
			<View style={styles.editProfileItemTextWrap}>
				<Text style={styles.editProfileItemText}>{from}-{to}</Text>
			</View>
			<Menu onSelect={value => onMenuPress(value, item.id, item.onDelete, item.onEdit)} style={styles.button}>
				<MenuTrigger>
					<Entypo name='dots-three-vertical' style={styles.dots} size={hp('2.4%')} color={'#ccc'}/>
				</MenuTrigger>
				<MenuOptions>
					<MenuOption value={1}>
						<Text style={[styles.menuOption, styles.menuOptionFirst]}>Редактировать</Text>
					</MenuOption>
					<MenuOption value={2}>
						<Text style={styles.menuOption}>Удалить</Text>
					</MenuOption>
				</MenuOptions>
			</Menu>
		</View>
	);
};

const onMenuPress = (value, id, onDelete, onEdit) => {
	if (value == 2) {
		Alert.alert(
			'Delete',
			'Are you sure you want to delete?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'OK', onPress: () => onDelete(id)},
			],
			{ cancelable: false }
		)
	} else {
		onEdit(id);
	}
}

class EditProfile extends Component<Props> {
	componentDidMount() {
		const { name, login, about, country, city, site } = this.props;
		const { fb, linkedin, twitter } = this.props.clinks;
		this.props.initialize({  
			name: (!!name ? name : ''), 
			login: (!!login ? login : ''), 
			about: (!!about ? about : ''), 
			fb: (!!fb ? fb : ''), 
			twitter: (!!twitter ? twitter : ''), 
			linkedin: (!linkedin ? linkedin : ''),
			country: (!!country ? country : ''),
			city: (!!city ? city : ''),
			site: (!!site ? site : '')
		});
	}

	renderHeader(title, expanded) {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.accordionHeaderText}>
          {''}{title}
        </Text>
        {expanded
          ? <Ionicons style={{ fontSize: 18 }} name='ios-arrow-up' />
          : <Ionicons style={{ fontSize: 18 }} name='ios-arrow-down' />}
      </View>
    );
	}
	
	renderContent(content) {
		if (content.type === 'contacts') {
			return (
				<View style={styles.accordionInner}>
					<Field 
						name='country' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='Country'
					/>
					<Field 
						name='city' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='City'
					/>
					<Field 
						name='site' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='Site'
					/>
					<Field 
						name='fb' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='Facebook'
					/>
					<Field 
						name='twitter' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='Twitter'
					/>
					<Field 
						name='linkedin' 
						component={AccordInputField} 
						style={styles.input}
						placeholder='LinkedIn'
					/>
				</View>
			);
		} else if (content.type === 'education') {
			return (
				<View style={styles.education}>
					<TouchableOpacity style={styles.btn} onPress={content.onPress}>
						<MaterialIcons active name='add-circle-outline' color={'#5A6978'} size={hp('2.4%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Add education</Text>
					</TouchableOpacity>
					{content.items.length > 0 && editProfileItemsList(content.items, content.onDelete, content.onEdit)}
				</View>
			);
		} else if (content.type === 'experience') {
			return (
				<View style={styles.education}>
					<TouchableOpacity style={styles.btn} onPress={content.onPress}>
						<MaterialIcons active name='add-circle-outline' color={'#5A6978'} size={hp('2.4%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Add experience</Text>
					</TouchableOpacity>
					{content.items.length > 0 && editProfileItemsList(content.items, content.onDelete, content.onEdit)}
				</View>
			);
		}
	}

	render() {
		const { 
			jobs, 
			educations, 
			onAddExperiencePress, 
			onAddEducationPress, 
			onExperienceDelete, 
			onEducationDelete, 
			onExperienceEdit,
			onEducationEdit,
			handleSave 
		} = this.props;

		const dataArray = [
			{ 
				title: 'Contacts', 
				content: { type: 'contacts' } },
			{ 
				title: 'Experience', 
				content: { 
					type: 'experience', 
					items: jobs, 
					onPress: onAddExperiencePress,
					onDelete: onExperienceDelete,
					onEdit: onExperienceEdit
				} 
			},
			{ 
				title: 'Education', 
				content: { 
					type: 'education', 
					items: educations, 
					onPress: onAddEducationPress,
					onDelete: onEducationDelete,
					onEdit: onEducationEdit
				} 
			}
		];

		return (
			<View style={styles.container}>
				<Field 
					name='name'
					component={InputField} 
					style={styles.input}
					placeholder='Name'
					showError={true}
				/>
				<Field 
					name='login' 
					component={InputField} 
					style={styles.login}
					placeholder='Login'
				/>
				<Field 
					name='about' 
					component={TextareaField} 
					style={styles.input}
					placeholder='About'
				/>
				<Accordion
					dataArray={dataArray}
					renderContent={this.renderContent}
					renderHeader={this.renderHeader}
					style={styles.accordion}
				/>
				<Button block primary onPress={handleSave}>
					<Text>Save</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
	form: 'edit_profile',
  validate
})(EditProfile);