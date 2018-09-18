import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

export default StyleSheet.create({
	container: {
		alignItems: 'flex-start',
	},
	headerContainer: {
		width: '100%',
		height: hp('31.6%'),
		backgroundColor: Colors.brandPrimary
	},
	logoWrap: {
		flex: 1, 
		flexDirection:'row', 
		alignItems: 'center',
		justifyContent: 'center' 
	},
	logo: {
		height: hp('13.5%'),
		width: hp('13.5%')*(151/60)
	},
	screenContainer: {
		paddingTop: hp('4.05%'),
		paddingLeft: wp('5.1%')
	},
	screenStyle: {
		height: hp('8.4%'),
		flexDirection: 'row',
		alignItems: 'center'
	},
	screenTextStyle:{
		fontSize: 20,
		marginLeft: 20
	},
	iconWrap: {
		paddingTop: hp('0.6%'),
		paddingBottom: hp('0.6%'),
		width: wp('13.6%')
	},
	iconUser: {
		height: hp('3.6%'),
		width: hp('3.6%')*(25/35)
	},
	iconGroup: {
		height: hp('3.6%'),
		width: hp('3.6%')*(37.5/35)		
	},
	iconComment: {
		height: hp('3.6%'),
		width: hp('3.6%')	
	},
	iconNotificationsActive: {
		height: hp('3.6%'),
		width: hp('3.6%')	
	},
	hasNew: {
		position: 'absolute',
		left: hp('3.6%') - hp('1%'),
		top: hp('0.3%')
	},
	commentHasNew: {
		left: hp('3.6%') - hp('1%'),
		top: hp('0.3%')
	},
	notificationsActiveHasNew: {
		left: hp('3.6%') - hp('1%'),
		top: hp('0.3%')
	}
});