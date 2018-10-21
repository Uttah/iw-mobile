import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  title: {
    fontSize: hp('2.55%')
  },
  listItem: {
    paddingTop: hp('1.7%'),
    paddingBottom: hp('1.7%')
  }
});