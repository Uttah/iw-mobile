import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	button: {
		marginTop: hp('2.7%'),
		borderRadius: 8,
		marginBottom: hp('2.7%'),
		marginLeft: wp('12.3%'),
		marginRight: wp('12.3%')
	},
	buttonText: {
		fontSize: hp('2.7%')
	}
});