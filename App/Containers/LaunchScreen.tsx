import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Button } from 'native-base'
import { Images } from 'App/Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { NavigationScreenProp } from 'react-navigation'
import Landing from 'App/Components/Landing'
import Login from 'App/Components/Login'

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

export default class LaunchScreen extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  _onPress = () => {
    this.props.navigation.navigate('ProfileScreen');
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logowrap}>
          <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
        </View>
        <View style={styles.landing}>
          <Landing/>
        </View>
        <Login style={styles.login}/>
      </View>
    )
  }
}
