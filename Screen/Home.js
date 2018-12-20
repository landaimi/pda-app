import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import CheckView from './CheckView';
import MaintainView from './MaintainView';
import InventoryView from './InventoryView';


const HomeScreen = createMaterialTopTabNavigator(
  {
    InventoryView: {
      screen: InventoryView,
    },
    CheckView: {
      screen: CheckView,
    },
    MaintainView: {
      screen: MaintainView,
    },
  }
);

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#29aae3',
        height: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


export default  RootStack;
