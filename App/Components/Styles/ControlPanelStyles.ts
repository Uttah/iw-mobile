import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	panel: {
		backgroundColor: '#ececec',
		paddingLeft: wp('8.1%'),
		paddingRight: wp('8.1%'),
		justifyContent: 'center',
		flex: 1,
	},
	searchIcon: {
		position: 'relative',
		left: -5
	},
	closeIcon: {
		position: 'relative',
		right: -5
	},
	input: {
		position: 'absolute',
		zIndex: 2,
		backgroundColor: '#ececec',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	inputField: {
		fontSize: hp('1.95%'),
		paddingBottom: 0,
		paddingTop: 0,
		top: 0,
	}
});