import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	inner: {
		paddingLeft: wp('4.53%'),
		paddingRight: wp('3.73%'),
		paddingBottom: 9,
    borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.16)'
	},
	authorName: {
		color: '#976DD0',
		fontSize: hp('2.1%')
	},
	time: {
    position: 'absolute',
		right: wp('4.27%'),
		top: hp('1.5%')
  },
  timeText: {
    color: '#969FAA',
    fontSize: hp('1.72%')
	},
	author: {
		marginTop: hp('1.5%')
	},
	viewmore: {
		paddingLeft: wp('9.07%'),
		paddingRight: wp('13.1%'),
	},
	text: {
		fontSize: hp('1.95%'),
		color: '#969FAA'
	},
	btns: {
		marginTop: hp('1.64%')
	},
	btn: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	btnicon: {
		marginRight: hp('0.4%'),
		width: hp('2.2.5%'),
		height: hp('2.25%')
	},
	btntext: {
		fontSize: hp('1.95%'),
		color: '#5A6978'
	}
});