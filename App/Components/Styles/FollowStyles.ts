import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnicon: {
    marginRight: hp('0.4%'),
    width: hp('2.25%'),
    height: hp('2.25%')
  },
  btntext: {
    fontSize: hp('1.95%'),
    color: '#5A6978'
  }
});