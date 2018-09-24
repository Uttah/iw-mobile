import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	outer: {
		flex: 1,
		paddingBottom: hp('1.5%'),
		borderBottomWidth: 1,
		borderBottomColor: '#D2DAE6'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatarWrap: {
		marginLeft: wp('4.27%'),
		marginTop: hp('2.55%'),
		height: wp('25%') + 2,
		width: wp('25%') + 2,
		borderRadius: 8,
		borderColor: '#b2b2b2',
		borderWidth: 1
	},
	avatar: {
		height: wp('25%'),
		width: wp('25%'),
		borderRadius: 8
	},
	numbers: {
		marginLeft: wp('6.5%')
	},
	author: {
		fontWeight: 'bold',
		fontSize: hp('1.95%'),
		marginTop: hp('1.5%'),
		marginLeft: wp('4.27%'),
		flex: 1
	},
	nickname: {
		fontSize: hp('1.72%'),
		marginLeft: wp('4.27%'),
		color: '#969FAA',
		flex: 1 
	},
	btn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	btnicon: {
		marginRight: hp('0.4%'),
		width: hp('2.25%'),
		height: hp('2.25%')
	},
	btntext: {
		fontSize: hp('1.95%'),
		color: '#5A6978'
	},
	avatarRight: {
		flex: 1, 
		flexDirection: 'column', 
		justifyContent: 'flex-start', 
		marginTop: hp('2.55%')
	},
	btns: {
		flex: 1,
		flexDirection: 'row'
	}
});