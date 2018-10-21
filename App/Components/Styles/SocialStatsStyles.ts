import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: hp('0.7%'),
  },
  iconLike: {
    height: hp('3%'),
    width: hp('3%')	
  },
  iconRetweets: {
    height: hp('3%'),
    width: hp('3%')*(37.5/35),
    marginTop: -1	
  },
  iconComment: {
    height: hp('3%'),
    width: hp('3%'),
    marginTop: 1
  },
  text: {
    fontSize: hp('1.95%'),
    fontWeight: 'bold',
    color: '#47525E'
  }
});