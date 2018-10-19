import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
  },
  list: {
    marginTop: hp('1.5%')
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
  hidden: {
    width: 0,
    height: 0,
    position: 'absolute'
  }
});