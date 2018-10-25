import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
  },
  subHeaderTitleWrap: {
    paddingTop: hp('3.15%'), 
    paddingBottom: hp('2.85%'), 
    borderWidth: 1, 
    borderColor: 'rgba(178, 178, 178, 0.5)', 
    paddingLeft: wp('7.7%')
  },
  subHeaderTitle: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    fontFamily: 'OpenSans_semi'
  },
  list: {
    //marginTop: hp('1.5%')
  },
	listItem: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'stretch',
    paddingLeft: wp('7.7%'),
    paddingRight: wp('7.7%')
  },
  listItemInner: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-start'
  },
  listItemTitle: {
    color: '#969FAA',
		fontFamily: 'OpenSans_semi',
    fontSize: hp('2.4%'),
    marginBottom: hp('0.97%')
  },
  listText: {
    fontSize: hp('1.95%')
  },
  switchText: {
    paddingLeft: wp('3.7%')
  },
  menu: {
  },
  iosLeftMargin: {
    marginLeft: (35-13.13)/4
  },
  androidLeftMargin: {
    marginLeft: (35-23.38)/4
  },
  iconWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: wp('7.7%') + hp('2.25%'),
  },
  menuOption: {
    fontSize: hp('2.25%'),
    paddingBottom: hp('1.05%'),
    paddingLeft: hp('0.67%')
  },
  menuOptionFirst: {
    paddingTop: hp('0.9%')
  },
  iconWrapInner: {
    flex: 1,
    justifyContent: 'center' 
  },
  checkboxText: {
    fontSize: hp('1.95%'),
    color: '#4c4c4c'
  },
  authRightCol: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});