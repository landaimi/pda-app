import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, TextInput, Alert, AsyncStorage,
} from 'react-native';
import ButtonView from './ButtonView';
import Api from './Api';
import Storage from 'react-native-storage';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  defaultExpires: null,
  enableCache: true,
})
// 全局变量
global.storage = storage

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPW: "",
    };
  }
  _onClickLogin = async () => {
    const { userName, userPW } = this.state;
    if(!userName){
      Alert.alert('提示','请输入用户名！',[{text: '确定', onPress: () => console.log('userName is null')},]);
      return;
    }
    if(!userPW){
      Alert.alert('提示','请输入密码！',[{text: '确定', onPress: () => console.log('password is null')},]);
      return;
    }
    let formData = new FormData();
    formData.append("userName",userName);
    formData.append("password",userPW);
    const that = this;
    fetch(Api.url+"login", {
      method: "POST",
      body: formData,
    }).then(function (res) {
      if (res.ok) {
        res.json().then(function (json) {
          console.log(json);
          if (json.success) {
            const { obj } = json;
            global.storage.save({
              key: 'token',
              data: obj,
              expires: null
            });
            that.props.navigation.navigate('Home');
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
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.lineStyle, { top: 99 }]} />
        <View style={styles.BGViewStyle}>
          <View style={[styles.inputCellStyle, { height: 49.75, top: 0, right: 0, }]}>
            <Text style={styles.welcome}>
              用户名
            </Text>
            <TextInput style={styles.inputViewStyle}
              onChangeText={(text) => {
                this.setState({ userName: text });
              }}
              placeholder="请输入用户名"
              autoFocus={true}
            />
          </View>
          <View style={[styles.lineStyle, { top: 49.75 }]} />
          <View style={[styles.inputCellStyle, { height: 49.75, top: 50.25, right: 0, justifyContent: 'space-between' }]}>
            <Text style={styles.welcome}>
              密码
            </Text>
            <TextInput style={styles.inputViewStyle}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ userPW: text });
              }}
              placeholder="请输入密码"
            />
          </View>
          <View style={[styles.lineStyle, { top: 99 }]} />
        </View>
        <ButtonView
          btnName='登录'
          btnStyle={styles.loginBtnStyle}
          onPress={this._onClickLogin}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  BGViewStyle: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  inputCellStyle: {
    left: 0, backgroundColor: 'white', flexDirection: 'row', position: 'absolute', alignItems: 'center',
  },
  lineStyle: {
    height: 0.5, backgroundColor: '#D6D6D6', position: 'absolute', left: 0, right: 0
  },
  inputViewStyle: {
    height: 49.5, right: 0, left: 80, top: 0, borderColor: 'white', borderWidth: 1, position: 'absolute'
  },
  loginBtnStyle: {
    backgroundColor: '#3385ff', height: 45, width: SCREEN_WIDTH - 32, top: 150, position: 'absolute', margin: 16,
  },
  forgetPWStyle: {
    margin: 16,
    position: 'absolute',
    right: 0,
    top: 210,
    width: 150,
    height: 30,
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  SIMBtnStyle: {
    position: 'absolute',
    top: 260,
    height: 30,
    width: SCREEN_WIDTH - 32,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    height: 16.5,
    width: 100,
  },
});
