import React, { Component } from 'react';
import { Text, Left, Right, Button, Radio, List, ListItem } from 'native-base';
import { View } from 'react-native';
import { Field, reduxForm, change } from 'redux-form';
import uuid from 'uuid/v1';
import InputField from './InputField';
import { SortInvestors } from '../Services/Enums';
import styles from './Styles/InvestorsFiltersStyles';

const validate = values => {
  const error = {};
  return error;
};

type Props = any;

const RadioButtons = ({ name, options, onPress }) => (
  <List style={styles.options}>
    <Field
      name={name}
      options={options}
      component={({input, options}) => (
        options.map(option => 
          <ListItem 
            noIndent
            key={option.id} 
            onPress={() => onPress(option.value)}
          >
            <Left>
              <Text>{option.label}</Text>
            </Left>
            <Right>
              <Radio selected={option.value === input.value}/>
            </Right>
          </ListItem>
        )
      )}
    />
  </List>
);

class InvestorsFilters extends Component<Props> {

  componentDidMount() {
    const { country, sortBy } = this.props;
    this.props.initialize({  
      country: (!!country ? country : ''),
      sortBy: (!!sortBy ? sortBy : SortInvestors.registrationDate),
    });
  }

  onRadioPress = (value) => {
    this.props.dispatch(change('investors_filters', 'sortBy', value));
  }

  render() {
    const { onSave } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.fieldTitle}>Country</Text>
        <Field 
          name='country'
          component={InputField} 
          style={styles.input}
          placeholder='Country'
        />
        <Text style={styles.fieldTitle}>Sort by</Text>
        <RadioButtons 
          name='sortBy' 
          options={[
            {
              id: uuid(),
              label: 'Number of followers',
              value: SortInvestors.followers
            },
            {
              id: uuid(),
              label: 'Registration date',
              value: SortInvestors.registrationDate
            }
          ]}
          onPress={this.onRadioPress}
        />
        <Button block primary onPress={onSave} style={styles.btn}>
          <Text uppercase={false}>Apply</Text>
        </Button>
      </View>
    );
  }
}

export default reduxForm({
  form: 'investors_filters',
  validate
})(InvestorsFilters);