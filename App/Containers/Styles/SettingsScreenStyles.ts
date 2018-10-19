import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerTitle: {
    fontSize: hp('2.55%'),
    fontFamily: 'OpenSans_semi',
    textAlign: 'center',
    marginTop: hp('2.25%'),
    marginBottom: hp('3.15%')
  },
  tabname: {
		fontSize: hp('1.5%'),
		color: '#656C74'
	},
	tabicon: {
		color: '#656C74'
  },
  btn: {
		marginTop: hp('2.7%'),
		borderRadius: 8,
		marginBottom: hp('2.7%'),
		marginLeft: wp('12.3%'),
		marginRight: wp('12.3%')
	},
	btnText: {
		fontSize: hp('2.7%')
	}
});