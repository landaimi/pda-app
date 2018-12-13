import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Screen/Login';
import Main from './Screen/Main';
import Test from './Screen/Test';

const TabNavigator = createBottomTabNavigator({
  Login: Login,
  Main: Main,
  Test: Test
});

export default createAppContainer(TabNavigator);
