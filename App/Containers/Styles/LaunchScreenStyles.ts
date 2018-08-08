import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from 'App/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    marginTop: 50
  },
  landing: {
    alignItems: 'center'
  },
  logo: {
    width: Metrics.images.logo,
    marginTop: 15
  },
  motivation: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 26,
    marginRight: 26,	
    marginTop: 20,
    fontFamily: Fonts.type.base,
    color: Colors.text
  }
})
