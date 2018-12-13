import React from 'react';
import { Text, View,   } from 'react-native';
import ButtonView from './ButtonView';

class InventoryInfo extends React.Component {
    static navigationOptions = {
        title: '设备盘点',
    };

    componentDidMount() {
        alert("111")
          // 扫描结果
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ButtonView
                    btnName='返回设备盘点'
                    onPress={() => this.props.navigation.navigate('InventoryView', {
                        id: 2999,
                        name: 'ppp'
                    })}
                />
                <Text>设备盘点详情</Text>
            </View>
        );
    }

}


export default InventoryInfo;
