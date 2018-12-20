import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import ScanEvent from '../Scanner';

export default class BarcodeScannerView extends React.Component {
  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    ScanEvent.on('scanned', this.onScanned);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate('Details');
    return true;
  };

  onScanned = data => {
    this.redirect(data.barCode);
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.redirect(data);
  }

  redirect(data) {
    this.props.navigation.navigate('InventoryInfo', {
      data
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>请开启访问摄像头权限</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }


}
