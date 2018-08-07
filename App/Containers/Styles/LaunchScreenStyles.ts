import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'App/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    flex: 2
  },
  landing: {
    flex: 2.5
  },
  logowrap: {
    flex: 1.1,
    alignItems: 'center'
  },
  logo: {
    width: Metrics.images.logo,
    marginTop: 15
  },
})
