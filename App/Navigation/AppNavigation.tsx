import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackNavigator, SwitchNavigator, DrawerNavigator, withNavigation } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import PoolsScreen from '../Containers/PoolsScreen';
import styles from './Styles/NavigationStyles';
import PoolViewScreen from '../Containers/PoolViewScreen';
import PoolAddScreen from '../Containers/PoolAddScreen';
import MessagesScreen from '../Containers/MessagesScreen';
import MessageScreen from '../Containers/MessageScreen';
import NotificationsScreen from '../Containers/NotificationsScreen';
import HeaderLogo from '../Components/HeaderLogo';
import { MaterialIcons } from '@expo/vector-icons';

const DrawerButtonWithNavigation = withNavigation(DrawerButton);
function DrawerButton({navigation}) {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('DrawerOpen');
    }}>
      <MaterialIcons name='menu' size={25} style={styles.menuicon}/>
    </TouchableOpacity>
  );
}

const DrawerNav = DrawerNavigator({
  ProfileScreen: {
    screen: StackNavigator({
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          drawerLabel: () => 'Profile',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      }
    })
  },
  PoolsScreen: { 
    screen: StackNavigator({
      PoolsScreen: {
        screen: PoolsScreen,
        navigationOptions: {
          drawerLabel: () => 'Pools',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      },
      PoolScreen: {
        screen: PoolViewScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTitle: <HeaderLogo/>,
          headerTintColor: '#fff',
          headerRight: <View/>
        }
      },
      PoolAddScreen: {
        screen: PoolAddScreen,
        navigationOptions: {
          drawerLabel: () => null,
          headerStyle: styles.header,
          headerTitle: <HeaderLogo/>,
          headerTintColor: '#fff',
          headerRight: <View/>
        }
      }
    }) 
  },
  MessagesScreen: {
    screen: StackNavigator({
      MessagesScreen: {
        screen: MessagesScreen,
        navigationOptions: {
          drawerLabel: () => 'Messages',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      },
      MessageScreen: {
        screen: MessageScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTitle: <HeaderLogo/>,
          headerTintColor: '#fff',
          headerRight: <View/>
        }
      }
    })
  },
  NotificationsScreen: {
    screen: StackNavigator({
      NotificationsScreen: {
        screen: NotificationsScreen,
        navigationOptions: {
          drawerLabel: () => 'Notifications',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      }
    })
  }
}, {
  initialRouteName: 'ProfileScreen',
});

const AppNavigation = SwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { 
    screen: DrawerNav
  }
})

export default AppNavigation;
