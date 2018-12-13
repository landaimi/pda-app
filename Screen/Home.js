import { createMaterialTopTabNavigator } from 'react-navigation';
import Main from './Main';



const TabNavigator = createMaterialTopTabNavigator({
  Login: Main,
  Main: Main,
  Test: Main
});


export default TabNavigator;
