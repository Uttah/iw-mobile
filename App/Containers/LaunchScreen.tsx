import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, PixelRatio } from 'react-native';
import { Images } from 'App/Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import Login from 'App/Components/Login';
import styles from './Styles/LaunchScreenStyles';
import UserActions from '../Redux/UserRedux';
import LoginActions from '../Redux/LoginRedux';
import socket from '../Services/Socket';

type Props = {
  navigation: NavigationScreenProp<any, any>,
}

class LaunchScreen extends Component<Props> {
  static navigationOptions = {
    header: null
  };
  
  state = {
    extraScrollHeight: 0
  };
  
  onRegisterPress = () => {
    this.props.navigation.navigate('RegisterScreen');
  }
  
  onForgotPress = () => {
    this.props.navigation.navigate('AddExperienceScreen');
    //alert('no screen here yet!');
  }

  onSuccess = (userData) => {
    const { dispatch, navigation } = this.props;
    if (!!userData) {
      dispatch(UserActions.setUser(userData));
      dispatch(LoginActions.setLogin(userData.email));
      navigation.navigate('MainScreen');
      socket.init();
    } else {
      alert('No user with such login and password!');
      return;
    }
  }
  
  onButtonViewLayout = (height) => {
    this.setState({
      extraScrollHeight: PixelRatio.getPixelSizeForLayoutSize(height)
    });
  }
  
  getExtraScrollHeight = () => {
    return this.state.extraScrollHeight;
  }
  
  render () {
    return (
      <KeyboardAwareScrollView 
        style={styles.mainContainer}  
        enableOnAndroid={true}
        extraScrollHeight={this.getExtraScrollHeight()}
      >
        <View style={styles.landing}>
          <Image source={Images.icoWorldLogo} style={styles.logo} resizeMode='contain'/>
          <Text style={styles.motivation}>Социальная сеть для криптоинвесторов, управляющих активами, ICO-проектов. icoWorld создаёт удобное пространство для общения и обеспечивает честность деловых отношений.</Text>
        </View>
        <Login
          style={styles.login} 
          onRegisterPress={this.onRegisterPress}
          onForgotPress={this.onForgotPress}
          onSuccess={this.onSuccess}
          onButtonViewLayout={(height) => this.onButtonViewLayout(height)}
        />
      </KeyboardAwareScrollView>
    )
  }
}

export default connect()(LaunchScreen);
