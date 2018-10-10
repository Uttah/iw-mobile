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
	accordionHeader: {
		flexDirection: 'row', 
		padding: hp('2.4%'), 
		justifyContent: 'space-between', 
		alignItems: 'center', 
		marginBottom: hp('2.8%'), 
		backgroundColor: '#edebed'
	},
	accordionHeaderText: {
		fontSize: hp('2.55%')
	},
	education: {
		marginBottom: hp('3.6%')
	},
	editProfileItem: {
		flex: 1, 
		paddingTop: hp('1.8%'), 
		paddingBottom: hp('1.8%'),
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(178, 178, 178, 0.5)'
	},
	editProfileItemTextWrap: {
		flex: 1
	},
	editProfileItemText: {
		fontSize: hp('1.95%')
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
	},
	menuOption: {
    fontSize: hp('2.25%'),
    paddingBottom: hp('1.05%'),
    paddingLeft: hp('0.67%')
  },
  menuOptionFirst: {
    paddingTop: hp('0.9%')
  },
  button: {
    position: 'absolute',
    right: -8,
    top: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8
	},
	editProfileItemTextWrapFirst: {
		marginBottom: hp('0.9%')
	}
});