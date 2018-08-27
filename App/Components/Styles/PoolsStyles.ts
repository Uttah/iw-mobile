import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
	//хорошо бы перенести в applic styles
	section: {
		marginLeft: wp('12%'),
		marginRight: wp('12%'),
		flex: 1
  },
  tabname: {
		fontSize: hp('1.5%'),
		color: '#656C74'
	},
	tabicon: {
		color: '#656C74'
	}
});