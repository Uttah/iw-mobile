import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
	container: {
	},
	inner: {
		paddingTop: hp('1.42%'),
		paddingLeft: wp('3.3%'),
		paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.16)'
	},
	number: {
		fontSize: hp('2.4%')
	},
	name: {
		fontSize: hp('2%'),
		marginTop: hp('1.1%')
	},
	comiss: {
		fontSize: hp('2%')
	},
	postAuthorAvatar: {
		height: wp('6.8%'),
		width: wp('6.8%'),
		paddingRight: wp('2.27%'),
		borderRadius: 4   
	},
	postAuthorAvatarWrap: {
		height: wp('6.8%') + 2,
		width: wp('6.8%') + 2,
		borderRadius: 4,
		borderColor: '#b2b2b2',
		borderWidth: 1,
		marginTop: 1
	},
	postAuthor: {
		fontSize: hp('1.87%'),
		color: '#969FAA'
	},
	bottomContainer: {
		marginTop: hp('1.95%'),
		// marginLeft: wp('3.3%'),
		marginRight: wp('4%')
	}
});