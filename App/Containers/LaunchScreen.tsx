import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Button } from 'native-base'
import { Images } from 'App/Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { NavigationScreenProp } from 'react-navigation';

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
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>!!!Hello from Linux. This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
            <Button block success onPress={this._onPress}>
              <Text>Перейти в профиль</Text>
            </Button>
          </View>

        </ScrollView>
      </View>
    )
  }
}
