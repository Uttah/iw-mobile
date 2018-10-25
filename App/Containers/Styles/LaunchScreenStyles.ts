import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles } from 'App/Themes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    marginTop: hp('12.3%')
  },
  landing: {
    alignItems: 'center'
  },
  logo: {
    height: hp('11.8%'),
    marginTop: hp('7.8%'),
  },
  motivation: {
    textAlign: 'center',
    fontSize: hp('2.5%'),
    marginLeft: wp('5.3%'),
    marginRight: wp('5.3%'),	
    marginTop: hp('6.1%'),
    fontFamily: Fonts.type.base,
    color: Colors.text
  }
});
