import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	tabname: {
		fontSize: hp('1.5%'),
		color: '#656C74'
	},
	tabicon: {
		color: '#656C74'
	}
});