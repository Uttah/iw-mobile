import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	inner: {
		paddingLeft: wp('3.3%'),
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
	}
});