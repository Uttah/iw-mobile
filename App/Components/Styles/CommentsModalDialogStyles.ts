import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

let screen = {
	pixel: 1 / PixelRatio.get(),
	...Dimensions.get('window')
};

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		flex: 1
	},
	modal: {
		backgroundColor: '#fff',
		marginLeft: 20,
		marginRight: 20,
		width: 0.85*screen.width,
		height: hp('27.7%'),
		borderRadius: 4
	},
	modalinner: {
		flex: 1,
		paddingTop: hp('3.15%'),
		paddingBottom: hp('3.15%'),
		paddingLeft: hp('4%'),
		paddingRight: hp('4%'),
		borderRadius: 4
	},
	title: {
		color: '#3E3E3E',
		fontWeight: 'bold',
		fontFamily: 'OpenSans_semi'
	},
	btns: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	btn: {
	},
	btnright: {
	},
	btnleft: {
		marginRight: hp('3%')
	},
	btntext: {
		padding: hp('0.37%')
	},
	text: {
		fontSize: hp('2.17%'),
		color: Colors.brandPrimary,
		fontWeight: 'bold',
		fontFamily: 'OpenSans_semi'
	},
	input: {
		marginTop: hp('3.9%'),
		marginBottom: hp('3%')
	}
});