import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Button } from 'native-base';
import { Images } from 'App/Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import Login from 'App/Components/Login';
import styles from './Styles/LaunchScreenStyles';

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
      <KeyboardAwareScrollView style={styles.mainContainer} extraScrollHeight={80} enableOnAndroid={true}>
        <View style={styles.landing}>
          <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
          <Text style={styles.motivation}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
        </View>
        <Login style={styles.login}/>
      </KeyboardAwareScrollView>
    )
  }
}
