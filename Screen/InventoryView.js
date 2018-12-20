import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';

const planList = [
  {
    id: "4028f78166b5f91b0166b5ff4125000a",
    name: "驱蚊器翁群无adasd",
    createPerson: "管理员",
    pandianPerson: "管理员",
    startDate: "2018-10-30",
    endDate: "2018-11-23",
    status: "待盘点"
  },
  {
    id: "4028f78166b5f91b0166b5ff4125000a",
    name: "驱蚊器翁群无adasd",
    createPerson: "管理员",
    pandianPerson: "管理员",
    startDate: "2018-10-30",
    endDate: "2018-11-23",
    status: "待盘点"
  }
];

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
    // padding:10,
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
  static navigationOptions = {
    title: '设备盘点',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const data = planList;
    this.setState({ data });
  }

  gotoItem(planId) {
    this.props.navigation.navigate('Scanner', { type: 1, planId });
  }

  render() {
    const { data } = this.state;
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F8F8FF' }}
      // onScroll={e => this.onScroll(e)}
      >
        {data ? data.map(i => (
          <TouchableOpacity onPress={() => this.gotoItem(i.id)} key={i.id}>
            <View style={styles.content}>
              <Text style={[styles.opc, styles.width, styles.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                dd
                      </Text>
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
        )) : null}
      </ScrollView>
    );
  }
}
