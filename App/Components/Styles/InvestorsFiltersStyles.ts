import { StyleSheet } from 'react-native';
import { ApplicationStyles } from 'App/Themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%')
  },
  fieldTitle: {
    color: '#969FAA',
		fontFamily: 'OpenSans_semi',
    fontSize: hp('2.4%'),
    marginBottom: hp('0.97%')
  },
  input: {
    marginBottom: hp('3.2%')
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
  btn: {
    marginTop: hp('3.1%')
  },
  sortByContainer: {
    marginTop: hp('2.7%')
  }
});