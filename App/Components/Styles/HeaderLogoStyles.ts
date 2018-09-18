import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
		flex: 1, 
		flexDirection:'row', 
		justifyContent: 'center' 
	},
	logo: {
		height: hp('4.5%'),
		width: hp('4.5%')*(151/60)
	}
});