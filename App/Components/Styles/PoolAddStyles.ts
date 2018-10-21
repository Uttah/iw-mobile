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
    marginBottom: hp('1.8%'),
    borderRadius: 8
  },
  buttonText: {
    fontSize: hp('2.7%')
  }
});