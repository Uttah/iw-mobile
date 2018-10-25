import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerTitle: {
    //fontSize: hp('3.9%'),
    fontSize: hp('2.55%'),
    fontFamily: 'OpenSans_semi',
    textAlign: 'center',
    marginTop: hp('2.25%'),
    marginBottom: hp('3.15%')
  },
  headerSubTitle: {
    fontSize: hp('2.7%'),
    fontFamily: 'OpenSans_semi',
    textAlign: 'center',
    marginTop: hp('2.7%'),
    marginBottom: hp('3.15%')
  },
  tabname: {
    fontSize: hp('1.5%'),
    color: '#656C74'
  },
  tabicon: {
    color: '#656C74'
  },
  filtered: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(178, 178, 178, 0.5)'
  }
});