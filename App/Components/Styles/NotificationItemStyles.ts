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
    borderBottomColor: 'rgba(0,0,0,0.16)',
    flex: 1,
    flexDirection: 'row'
  },
  time: {
    position: 'absolute',
    right: wp('4.27%'),
    top: 0
  },
  timeText: {
    color: '#969FAA',
    fontSize: hp('1.72%')
  },
  text: {
    fontSize: hp('1.95%'),
    color: '#969FAA',
    paddingRight: hp('1.65%')
  },
  btn: {
    marginTop: hp('1.64%'),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnicon: {
    marginRight: hp('0.4%'),
    width: hp('2.25%'),
    height: hp('2.25%')
  },
  iconlike: {
    marginRight: 0
  },
  btntext: {
    fontSize: hp('1.95%'),
    color: '#5A6978'
  },
  content: {
    paddingLeft: hp('1.5%'),
    paddingRight: wp('13.1%'),
    flex: 1,
    alignItems: 'flex-start'
  },
  avatarWrap: {
    height: wp('6.8%') + 2,
    width: wp('6.8%') + 2,
    borderRadius: 4,
    borderColor: '#b2b2b2',
    borderWidth: 1
  },
  avatar: {
    height: wp('6.8%'),
    width: wp('6.8%'),
    paddingRight: wp('2.27%'),
    borderRadius: 4   
  },
});