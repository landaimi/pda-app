import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions, ToastAndroid, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import ScanEvent from '../Scanner';
import Api from './Api';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
export default class BarcodeScannerView extends React.Component {
  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.state={
      userId: null,
      planId: null,
      type: null,
      dict1: null,
      dict2: null,
      scanSuccess:false,
    };
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
    const paramData = this.props.navigation.state.params;
    const { userId, planId, type } = paramData;
    this.setState({ userId, planId, type });
    ToastAndroid.showWithGravityAndOffset(
      "请扫描设备条形码！",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    this.getDict('pandian_report', userId);
    this.getDict('DEVICE_LOCATION', userId);
  }
  onBackButtonPressAndroid = () => {
    const { type, userId } = this.state;
    if (type === 1) {
      this.props.navigation.navigate('InventoryView', { userId });
    } else if (type === 2) {
      this.props.navigation.navigate('CheckView', { userId });
    } else if (type === 3) {
      this.props.navigation.navigate('MaintainView', { userId });
    }
    return true;
  };



  onScanned = data => {
    this.redirect(data.barCode);
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.redirect(data);
  }


  getDict(code, userId){
    let formData = new FormData();
    formData.append("userId",userId);
    formData.append("code",code);
    const that = this;
    fetch(Api.url+"typeList", {
        method: "POST",
        body: formData,
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (json) {
            console.log(json);
            if (json.success) {
              const { obj } = json;
              if(obj){
                console.log(obj);
                  if(code === 'pandian_report'){
                    that.setState({dict1: obj});
                  }
                  if(code === 'DEVICE_LOCATION'){
                    that.setState({dict2: obj});
                  }
              }
            } else if (json.msg) {
              Alert.alert('提示', json.msg, [{ text: '确定', onPress: () => console.log(json) },]);
            }
          });
        } else {
          Alert.alert('提示', '请求失败', [{ text: '确定', onPress: () => console.warn('request failed! res=', res) },]);
        }
      }).catch(function (e) {
        console.error("fetch error!", e);
        Alert.alert('提示', '系统错误', [{ text: '确定', onPress: () => console.log('request error!') },]);
      });
}

  redirect(data) {
    data = '1654839548291';
    const { userId, planId, type, dict1, dict2 } = this.state;
    if (data && userId && planId) {
      let formData = new FormData();
      formData.append("userId", userId);
      formData.append("planId", planId);
      formData.append("codeNbr", data);
      const that = this;
      fetch(Api.url + "getPlanItemId", {
        method: "POST",
        body: formData,
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (json) {
            console.log('json', json);
            if (json.success) {
              const { obj } = json;
              console.log('obj', obj);
              if (obj) {
                that.setState({ itemInfo: obj.device, itemId: obj.itemId, scanSuccess: true});
              }
            } else if (json.msg) {
              Alert.alert('提示', json.msg, [{ text: '确定', onPress: () => console.log(json) },]);
            }
          });
        } else {
          Alert.alert('提示', '请求失败', [{ text: '确定', onPress: () => console.warn('request failed! res=', res) },]);
        }
      }).catch(function (e) {
        console.error("fetch error!", e);
        Alert.alert('提示', '系统错误', [{ text: '确定', onPress: () => console.log('request error!') },]);
      });
    }
  }

  render() {
    const { hasCameraPermission, scanSuccess, itemId, itemInfo, userId, planId, type, dict1, dict2, } = this.state;
    if(scanSuccess && dict1 && dict2 ){
      this.props.navigation.navigate('InventoryInfo',{
        itemId, itemInfo, userId, planId, type, dict1, dict2,
      });
    }
    if (hasCameraPermission === null) {
      return <Text>请开启访问摄像头权限</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 , backgroundColor: 'white', paddingTop: 30}}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill]}
        />
      </View>
    );
  }


}
