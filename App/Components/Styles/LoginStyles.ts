import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Colors } from 'App/Themes';

export default StyleSheet.create({
    section: {
        marginLeft: wp('12%'),
        marginRight: wp('12%'),
        flex: 1
    },
    input: {
        marginBottom: hp('3.2%')
    },
    button: {
        marginTop: hp('0.9%'),
        borderRadius: 8
    },
    buttonText: {
        fontSize: hp('2.7%')
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linkText: {
        paddingLeft: 0,
        paddingRight: 0,
        textDecorationLine: 'underline',
        color: '#748398',
        fontSize: hp('1.95%')
    }
});