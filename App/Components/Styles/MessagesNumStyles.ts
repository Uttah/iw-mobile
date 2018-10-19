import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		width: hp('2.1%'),
    height: hp('2.1%'),
    borderRadius: 18,
		backgroundColor: '#3f51b5',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#fff',
		fontSize: hp('1.5%'),
		textAlign: 'center'
	}
});