import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  post: {
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.16)'
  },
  image: {
    height: wp('22.7%'),
    width: wp('22.7%'),
    marginLeft: wp('3.3%'),
    marginTop: 5
  },
  topContainer: {
    marginTop: hp('1.8%')
  },
  title: {
    fontFamily: 'OpenSans_semi',
    fontSize: hp('2.4%'),
    color: '#47525E'
  },
  textCol: {
    paddingLeft: wp('3.3%'),
    paddingRight: wp('4%')
  },
  postStatsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2%')
  },
  postStats: {
    fontWeight: 'bold',
    fontSize: hp('1.95%'),
    color: '#47525E'
  },
  postLikes: {
    marginRight: hp('2.1%')
  },
  lead: {
    marginLeft: wp('3.3%'),
    marginTop: hp('2%'),
    marginRight: wp('4.4%')
  },
  leadText: {
    fontSize: wp('4%'),
    color: '#47525E'
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
    marginTop: 3
	},
  postAuthor: {
    fontSize: hp('1.87%'),
    color: '#969FAA'
  },
  bottomContainer: {
    marginTop: hp('1.87%'),
    marginLeft: wp('3.3%'),
    marginRight: wp('4%')
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
    right: 0,
    top: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8
  }
});