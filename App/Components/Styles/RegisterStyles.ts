import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  //хорошо бы перенести в applic styles
  section: {
    marginLeft: wp('12%'),
    marginRight: wp('12%'),
    flex: 1
  },
  input: {
    marginBottom: hp('3.2%')
  },
  button: {
    marginTop: hp('0.9%'),
    borderRadius: 8
  },
  buttonText: {
    fontSize: hp('2.7%')
  },
  checkboxWrap: {
    alignItems: 'flex-start', 
    marginLeft: 0, 
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  checkboxTextWrap: {
    
  },
  checkboxText: {
    fontSize: hp('1.87%'),
    //color: '#666'
    color: '#4c4c4c'
  }
});