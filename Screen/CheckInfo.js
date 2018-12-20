import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import ButtonView from './ButtonView';

class CheckInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={ barCode: null };
    }
    static navigationOptions = {
        title: '设备巡检',
    };

    componentDidMount(){
        this.setState({ data: this.props.navigation.state.params });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hello Main, data: {JSON.stringify(this.state)}</Text>
                <ButtonView
                    btnName='返回设备巡检'
                    onPress={() => this.props.navigation.navigate('Main', {
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
