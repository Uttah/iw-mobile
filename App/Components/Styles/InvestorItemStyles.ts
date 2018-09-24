import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	avatarWrap: {
		height: hp('13.7%') + 2,
		width: hp('13.7%') + 2,
		borderRadius: 8,
		borderColor: '#b2b2b2',
		borderWidth: 1,
		marginTop: hp('2.7%')
	},
	avatar: {
		height: hp('13.7%'),
		width: hp('13.7%'),
		borderRadius: 8
	},
	inner: {
		flex: 1,
		alignItems: 'center',
		paddingBottom: 9,
    borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.16)'
	},
	container: {
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.brandPrimary,
		borderRadius: 6,
		width: hp('13.7%') + 2,
		height: hp('3.15%'),
		marginTop: hp('1.2%'),
		marginBottom: hp('1.35%')
	},
	buttonText: {
		color: '#fff',
		fontSize: hp('1.95%')
	},
	name: {
		color: Colors.brandPrimary,
		fontSize: hp('2.1%')
	},
	login: {
		fontSize: hp('1.95%'),
		color: '#969FAA',
	},
	subscribers: {
		fontSize: hp('1.95%'),
		color: '#969FAA',
	}
});