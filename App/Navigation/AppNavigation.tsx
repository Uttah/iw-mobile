import React from 'react';
import {Button, Text} from 'native-base';
import { StackNavigator, SwitchNavigator, DrawerNavigator, withNavigation } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import PoolsScreen from '../Containers/PoolsScreen';
import styles from './Styles/NavigationStyles';
import PoolViewScreen from '../Containers/PoolViewScreen';
import PoolAddScreen from '../Containers/PoolAddScreen';

const DrawerButtonWithNavigation = withNavigation(DrawerButton);
function DrawerButton({navigation}) {
  return (
    <Button onPress={() => {
      navigation.navigate('DrawerOpen');
    }}>
      <Text>Drawer</Text>
    </Button>
  );
}

const DrawerNav = DrawerNavigator({
  ProfileScreen: { screen: ProfileScreen },
  PoolsScreen: { 
    screen: StackNavigator({
      PoolsScreen: {screen: PoolsScreen},
      PoolScreen: {
        screen: PoolViewScreen,
      },
    }) 
  },
  PoolAddScreen: {
    screen: PoolAddScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
}, {
  initialRouteName: 'ProfileScreen',
});

const AppNavigation = SwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { 
    screen: StackNavigator({
      Drawer: DrawerNav,
    }, {
      navigationOptions: {
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerLeft: <DrawerButtonWithNavigation />
      }
    })
  }
})

export default AppNavigation;
