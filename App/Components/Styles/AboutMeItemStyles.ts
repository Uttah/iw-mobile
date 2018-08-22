import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		paddingLeft: hp('3.75%'),
		paddingRight: hp('3.75%'),
		paddingTop: hp('2.1%'),
		paddingBottom: hp('2.4%'),
		borderBottomWidth: 1,
		borderBottomColor: '#b2b2b2'
	},
	title: {
		color: '#969FAA',
		fontFamily: 'OpenSans_semi',
		fontSize: hp('2.4%')
	},
	text: {
		fontSize: hp('1.95%'),
		marginTop: hp('0.97%')
	}
});