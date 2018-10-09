import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		paddingLeft: hp('6.6%'),
		paddingRight: hp('6.6%')
	},
	input: {
		marginBottom: hp('3.2%')
	},
	login: {
		marginBottom: hp('3.2%') - 5
	},
	accordion: {
		borderWidth: 0
	},
	accordionInner: {
	},
	btn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: hp('2.7%'), 
		borderBottomWidth: 1,
		//to do: move border color to vars
		borderBottomColor: 'rgba(178, 178, 178, 0.5)'
	},
	btnicon: {
		marginRight: hp('0.4%'),
		width: hp('2.4%'),
		height: hp('2.4%')
	},
	btntext: {
		fontSize: hp('2.55%')
	}
});