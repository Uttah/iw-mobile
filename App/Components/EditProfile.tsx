import React, { Component } from 'react';
import { Text, Accordion } from 'native-base';
import { View, TouchableOpacity, FlatList } from 'react-native';
import styles from './Styles/EditProfileStyles';
import { Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from './InputField';
import AccordInputField from './AccordInputField';
import TextareaField from './TextareaField';
import _validate from '../Services/Validator';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const validate = values => {
	const error = {};
	error.name = _validate('name', values.name);
	error.login = _validate('name', values.login);
	return error;
};

type Props = any;

const renderItem = ({ item }) => {
	return (
		<View key={item.id} style={{flex: 1, paddingTop: hp('2.3%'), paddingBottom: hp('2.3%')}}>
			<View style={{flex: 1}}>
				<Text style={{fontSize: hp('1.95%')}}>{item.name}</Text>
			</View>
			<View style={{flex: 1}}>
				<Text style={{fontSize: hp('1.95%')}}>{item.from}-{item.to}</Text>
			</View>
		</View>
	);
};

const educationsList = (items) => {
	return (
		<FlatList
			data={items}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

class EditProfile extends Component<Props> {

	renderHeader(title, expanded) {
    return (
      <View
        style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: "center", marginBottom: 20, backgroundColor: '#edebed' }}
      >
        <Text style={{ fontSize: hp('2.55%') }}>
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
						name='facebook' 
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
				<View style={{flex: 1}}>
					<TouchableOpacity style={styles.btn} onPress={() => {}}>
						<MaterialIcons active name='add-circle-outline' color={'#5A6978'} size={hp('2.4%')} style={styles.btnicon}/>
						<Text style={styles.btntext}>Add education</Text>
					</TouchableOpacity>
					{educationsList(content.items)}
				</View>
			);
		} else if (content === 'experience') {
			return (<Text>experience</Text>);
		}
	}

	render() {
		const dataArray = [
			{ title: 'Contacts', content: { type: 'contacts' } },
			{ title: 'Experience', content: { type: 'experience' } },
			{ title: 'Education', content: { type: 'education', items: this.props.educations } }
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
				<Button block primary onPress= {() => {}}>
					<Text>Save</Text>
				</Button>
			</View>
		);
	}
}

export default reduxForm({
  form: 'add_experience',
  validate
})(EditProfile);