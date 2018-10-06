import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Colors } from 'App/Themes'

export default StyleSheet.create({
	errorLabel: {
		color: Colors.error,
		fontSize: hp('1.87%')
	},
	input: {
		marginTop: -11,
		fontSize: hp('2.5%')
	}
});