import { StyleSheet } from 'react-native';
import { Colors } from 'App/Themes'

export default StyleSheet.create({
    section: {
        marginLeft: 45,
        marginRight: 45,
        flex: 1
    },
    input: {
        marginBottom: 20
    },
    button: {
        marginTop: 7,
        borderRadius: 8
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
        color: Colors.charcoal
    }
});