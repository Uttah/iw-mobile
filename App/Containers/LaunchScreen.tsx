import React, { Component } from 'react';
import { ScrollView, Text, Image, View, PixelRatio } from 'react-native';
import { Button } from 'native-base';
import { Images } from 'App/Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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

  _getExtraScrollHeight = () => {
    //ratios: 1, 1.5, 2, 3, 3.5 (у меня 2.6, на iphone 5s 2)
    const ratio = PixelRatio.get();
    if (ratio <= 2) {
      return 70;
    } else if (ratio > 2) {
      return 120;
    }
  }

  render () {
    return (
      <KeyboardAwareScrollView 
        style={styles.mainContainer}  
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={this._getExtraScrollHeight()}
        resetScrollToCoords={{ x: 0, y: 0 }}
        >
        <View style={styles.landing}>
          <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
          <Text style={styles.motivation}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
        </View>
        <Login style={styles.login}/>
      </KeyboardAwareScrollView>
    )
  }
}
