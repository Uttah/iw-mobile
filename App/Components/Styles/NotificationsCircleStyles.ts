import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		width: hp('1.2%'),
    height: hp('1.2%'),
    borderRadius: 18,
		backgroundColor: '#EF0046',
		alignItems: 'center',
		justifyContent: 'center'
	}
});