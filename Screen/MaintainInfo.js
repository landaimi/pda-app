import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import ButtonView from './ButtonView';

class  MaintainInfo extends React.Component {
    static navigationOptions = {
        title: '设备保养',
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ButtonView
                    btnName='返回设备保养'
                    onPress={() => this.props.navigation.navigate('MaintainView', {
                        id: 2999,
                        name: 'ppp'
                    })}
                />
                <Text>设备保养详情</Text>
            </View>
        );
    }

}


export default  MaintainInfo;
