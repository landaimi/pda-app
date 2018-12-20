import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonView from './ButtonView';
import BarcodeScannerView from './BarcodeScannerView';
import InventoryInfo from './InventoryInfo';
import { createDrawerNavigator } from 'react-navigation';
export default class Main extends React.Component {
  static navigationOptions = {
    title: '设备保养',
  };

  toScanBarCode = () => {
    this.props.navigation.navigate('Scanner',{type:1});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Main</Text>
        <ButtonView
          btnName='去扫码'
          btnStyle={styles.loginBtnStyle}
          onPress={this.toScanBarCode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
