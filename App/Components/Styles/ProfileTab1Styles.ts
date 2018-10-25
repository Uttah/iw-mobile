import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  noActivity: {
    marginTop: hp('1.85%'),
    paddingLeft: wp('4.27%')
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('1.85%')
  }
});