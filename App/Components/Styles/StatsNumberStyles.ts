import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
  },
  number: {
    fontWeight: 'bold',
    fontSize: hp('2.99%'),
    textAlign: 'center'
  },
  text: {
    color: '#969FAA',
    fontSize: hp('1.5%'),
    textAlign: 'center'
  }
});