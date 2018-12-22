import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Api from './Api';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  icon: {
    width: 18, height: 18, marginRight: 16,
  },
  img: {
    position: 'absolute', top: 0, right: 0, width: 56, height: 56,
  },
  opc: {
    opacity: 1,
  },
  content: {
    height: 112,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 3 ,
    backgroundColor: '#fff',
  },
  width: {
    width: 70,
  },
  loadMoreFooter: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  mgr_5: {
    marginRight: 5,
  },
});

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userId: null,
      loading: true,
      type: 1,
    };
  }
  async componentDidMount() {
    const user= await global.storage.load({
      key:'token'
    })
    if(!user){
      this.props.navigation.navigate('Login');
    }
    this.setState({userId: user.userId});
    const { userId } = user;
    console.log(this.props.navigation);
    const param = this.props.navigation.state;
    const { key } = param;
    let type;
    if(key === 'InventoryView'){
      type = 1;
    }
    if(key === 'CheckView'){
      type = 2;
    }
    if(key === 'MaintainView'){
      type = 3;
    }
    this.setState({ type });
    if(type === 3){
      return;
    }
    if (userId) {
      this.setState({ userId });
      let formData = new FormData();
      formData.append("userId",userId);
      const that = this;
      let url ;
      if(type === 1){
        url = Api.url+"pandianPlanList";
      }
      if(type === 2){
        url = Api.url+"xunjianPlanList";
      }
      fetch(url, {
        method: "POST",
        body: formData,
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (json) {
            console.log(json);
            if (json.success) {
              const { obj } = json;
              if(obj.planList){
                that.setState({data: obj.planList, loading: false});
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
    }else{
      this.props.navigation.navigate('Login');
    }
  }

  gotoItem(planId) {
    const { userId, type } = this.state;
    this.props.navigation.navigate('Scanner', { type, planId, userId });
  }

  render() {
    const { data, loading, type } = this.state;
    if (type === 3) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text>敬请期待！</Text>
        </View>
      );
    }
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F8F8FF' }}
      // onScroll={e => this.onScroll(e)}
      >
        {data ? data.map(i => (
          <TouchableOpacity onPress={() => this.gotoItem(i.id)} key={i.id}>
            <View style={styles.content}>
              <View style={{ flex: 1 }}>
                <View style={styles.list}>
                  <Text style={{ fontSize: 15, color: '#39333d' }}>
                    {i.name}
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text style={{ fontSize: 15, color: '#39333d' }}>
                    开始时间：{i.startDate}
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text style={{ fontSize: 15, color: '#39333d' }}>
                    结束时间：{i.endDate}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )) : loading
        ? <Text style={[styles.opc, styles.width, styles.mgr_5, { fontSize: 15, color: '#39333d' }]}>
          正在加载...
          </Text>
        : <Text style={[styles.opc, styles.width, styles.mgr_5, { fontSize: 15, color: '#39333d' }]}>
          没有数据
          </Text>}
      </ScrollView>
    );
  }
}
