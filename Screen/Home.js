import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import InventoryView from './InventoryView';

const HomeScreen = createMaterialTopTabNavigator(
  {
    InventoryView: {
      screen: InventoryView,
      navigationOptions: () => ({
        title: '设备盘点',
      }),
    },
    CheckView: {
      screen: InventoryView,
      navigationOptions: () => ({
        title: '设备巡检',
      }),
    },
    MaintainView: {
      screen: InventoryView,
      navigationOptions: () => ({
        title: '设备保养',
      }),
    },
  },{
    lazy: true,
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
