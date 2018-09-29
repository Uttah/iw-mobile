import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, withNavigation } from 'react-navigation';
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
import CommentsScreen from '../Containers/CommentsScreen';
import InvestorsScreen from '../Containers/InvestorsScreen';
import HeaderLogo from '../Components/HeaderLogo';
import { MaterialIcons } from '@expo/vector-icons';
import DrawerContent from '../Components/DrawerContent';

const DrawerButtonWithNavigation = withNavigation(DrawerButton);
function DrawerButton({navigation}) {
  return (
    <TouchableOpacity onPress={() => {
      navigation.openDrawer();
    }}>
      <MaterialIcons name='menu' size={25} style={styles.menuicon}/>
    </TouchableOpacity>
  );
}

const DrawerNav =  createDrawerNavigator({
  ProfileScreen: {
    screen: createStackNavigator({
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      },
      CommentsScreen: {
        screen: CommentsScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerRight: <View/>          
        }
      }
    })
  },
  PoolsScreen: { 
    screen: createStackNavigator({
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
    screen: createStackNavigator({
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
    screen: createStackNavigator({
      NotificationsScreen: {
        screen: NotificationsScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      }
    })
  },
  InvestorsScreen: {
    screen: createStackNavigator({
      InvestorsScreen: {
        screen: InvestorsScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerLeft: <DrawerButtonWithNavigation />,
          headerRight: <View/>
        }
      },
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerRight: <View/>
        }
      },
      MessageScreen: {
        screen: MessageScreen,
        navigationOptions: {
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitle: <HeaderLogo/>,
          headerRight: <View/>          
        }
      }
    })
  }
}, {
  initialRouteName: 'ProfileScreen',
  contentComponent: DrawerContent
});

const AppNavigation = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { 
    screen: DrawerNav
  }
})

export default AppNavigation;
