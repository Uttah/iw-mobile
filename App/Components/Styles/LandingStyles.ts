import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'App/Themes'

export default StyleSheet.create({
    section: {
        justifyContent: 'center'
    }, 
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30
    },
    motivation: {
        textAlign: 'center',
        fontSize: 18
    },
    slideText: {
        marginLeft: 26,
        marginRight: 26,	
        fontFamily: Fonts.type.base,
        color: Colors.text
    },
    menuItem: {
        marginTop: 15
    },
    menuItemText: {
        textAlign: 'center',
        fontSize: 14,
        color: Colors.text
    },
    slideTitle: {
        fontFamily: Fonts.type.emphasis,
        fontSize: 17,
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center'
    }
});