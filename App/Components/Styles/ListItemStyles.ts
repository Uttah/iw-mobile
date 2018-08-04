import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'App/Themes'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'red'
    },
    number: {
        marginRight: 10
    },
    numbertext: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.text,
    },
    textinner: {
        fontSize: 14,
        color: Colors.text,
        paddingTop: 3
    }
});