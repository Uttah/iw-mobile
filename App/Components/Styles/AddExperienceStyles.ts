import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		paddingLeft: hp('6.6%'),
		paddingRight: hp('6.6%')
	},
	input: {
		marginBottom: hp('3.2%')
	},
});