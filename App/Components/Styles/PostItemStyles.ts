import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  image: {
    height: wp('22.7%'),
    width: wp('22.7%'),
    marginLeft: wp('3.3%'),
    //marginTop: 5
    marginTop: hp('1%')
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
    paddingRight: wp('4.4%')
  },
  postStatsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('3%')
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
    paddingRight: wp('4.4%')
  },
  leadText: {
    fontSize: wp('4%'),
    color: '#47525E'
  }
});