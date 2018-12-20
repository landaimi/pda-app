import React from 'react';
import {
    View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, BackHandler,
} from 'react-native';
import ButtonView from './ButtonView';

const style = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    flex_al: {
        alignItems: 'center',
    },
    flex_bl: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex_c1: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    padtb: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    mar5: {
        marginTop: 5,
        marginBottom: 5,
    },
    pad15: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    mgt5: {
        marginTop: 5,
    },
    f_border: {
        borderBottomWidth: 1,
        borderColor: '#d7d7d7',
        borderStyle: 'solid',
    },
    mon_inp: {
        borderWidth: 1,
        borderColor: '#ddd',
        width: 50,
        height: 24,
        padding: 4,
        paddingLeft: 2,
        backgroundColor: '#fff',
        fontSize: 14,
        borderRadius: 3,
    },
    baoxiao_st: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    inp_wh: {
        // height:20
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    rowText: {
        fontSize: 16,
        color: '#39333d',
    },
    fonts_12: {
        fontSize: 14,
    },
    tagstyle: {
        width: 40,
        height: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 3,
        borderWidth: 1,
        borderColor: '#00BFFF',
    },
    font_style: {
        fontSize: 15,
        color: '#39333d',
    },
});

class InventoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    static navigationOptions = {
        title: '设备盘点',
    };

    componentDidMount() {
        this.setState({ data: this.props.navigation.state.params });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.navigate('Details');
        return true;
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    render() {
        const sty = style;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    ref={(ref) => { this.scrollView = ref; }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps
                >
                    <View>
                        <View style={[sty.flex, sty.mar5, { marginTop: 20 }]}>
                            <Text style={sty.font_style}>
                                设备名称
                            </Text>
                            <Text style={sty.font_style}>
                                观灯片
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}


export default InventoryInfo;
