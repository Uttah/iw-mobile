import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'App/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    marginBottom: Metrics.section
  },
  landing: {
    flex: 1.5,
    //backgroundColor: 'green'
  },
  logo: {
    // backgroundColor: 'blue',
    height: 70,
    marginTop: 35,
    //backgroundColor: 'red'
  },
})
