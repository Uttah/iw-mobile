import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'App/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    marginBottom: Metrics.section
  },
  landing: {
    flex: 2
  }
})
