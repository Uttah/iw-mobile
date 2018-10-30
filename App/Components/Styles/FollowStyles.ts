import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

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
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brandPrimary,
    borderRadius: 6,
    width: hp('13.7%') + 2,
    height: hp('3.15%')
  },
  btnPrimaryIcon: {

  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: hp('1.95%')
  }
});