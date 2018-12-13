import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import ButtonView from './ButtonView';

class CheckInfo extends React.Component {
    static navigationOptions = {
        title: '设备巡检',
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ButtonView
                    btnName='返回设备巡检'
                    onPress={() => this.props.navigation.navigate('CheckView', {
                        id: 2999,
                        name: 'ppp'
                    })}
                />
                <Text>设备巡检详情</Text>
            </View>
        );
    }

}


export default CheckInfo;
