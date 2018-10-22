import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
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
    borderWidth: 1
  },
  postAuthor: {
    fontSize: hp('1.87%'),
    color: '#969FAA',
    alignSelf: 'flex-start'
  },
  bottomContainer: {
    marginTop: hp('1.87%') - hp('2.1%')/2,
    paddingTop: hp('2.1%')/2
  },
  zeroMessages: {
    paddingTop: 0,
    marginTop: hp('1.87%')
  },
  authorNameCol: {
    justifyContent: 'center', 
    alignItems: 'flex-start'
  },
  messagesNum: {
    position: 'absolute',
    bottom: wp('6.8%') + 2 - hp('2.1%')/2,
    left: wp('6.8%') + 2 - hp('2.1%')/2
  }
});