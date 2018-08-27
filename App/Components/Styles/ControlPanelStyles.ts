import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	panel: {
		backgroundColor: '#ececec'
	},
	panelInner: {
		marginLeft: wp('8.1%'),
		marginRight: wp('8.1%'),
		marginBottom: 5,
		marginTop: 10,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		position: 'relative',
		zIndex: 1
	},
	left: {
		height: hp('4.2%'),
		position: 'relative'
	},
	right: {
		height: hp('4.2%')
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
	}
});