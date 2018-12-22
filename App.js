import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Screen/Login';
import Home from './Screen/Home';
import BarcodeScannerView from './Screen/BarcodeScannerView';
import InventoryInfo from './Screen/InventoryInfo';

const TabNavigator = createSwitchNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  },
  Scanner: {
    screen: BarcodeScannerView,
  },
  InventoryInfo: {
    screen: InventoryInfo,
  },
});

export default createAppContainer(TabNavigator);
