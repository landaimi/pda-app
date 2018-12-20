import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Screen/Login';
import Home from './Screen/Home';
import BarcodeScannerView from './Screen/BarcodeScannerView';
import CheckInfo from './Screen/CheckInfo';
import InventoryInfo from './Screen/InventoryInfo';
import MaintainInfo from './Screen/MaintainInfo';

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
  CheckInfo: {
    screen: CheckInfo,
  },
  InventoryInfo: {
    screen: InventoryInfo,
  },
  MaintainInfo: {
    screen: MaintainInfo,
  },
});

export default createAppContainer(TabNavigator);
