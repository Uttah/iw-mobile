import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'App/Themes'

export default StyleSheet.create({
    section: {
        justifyContent: 'center'
    }, 
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 5,
        paddingLeft: 25,
        paddingRight: 25
    },
    logosmall: {
        height: 80,
        marginTop: 15
    },
    motivation: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 18
    },
    slideText: {
        marginLeft: 26,
        marginRight: 26,	
        fontFamily: Fonts.type.base,
        color: Colors.text
    },
    menuItemText: {
        textAlign: 'center',
        fontSize: 14,
        color: Colors.text
    },
    menuItemNumber: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: Colors.text,
        marginTop: 8
    },
    slideTitle: {
        fontFamily: Fonts.type.emphasis,
        fontSize: 17,
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center'
        // backgroundColor: 'red'
    }
});