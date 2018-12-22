import React from 'react';
import {
    View, Text, Dimensions, StyleSheet, Image, ScrollView,
    BackHandler, TouchableOpacity, TextInput, ToastAndroid,
    Alert,
} from 'react-native';
import Api from './Api';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

const style = StyleSheet.create({
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
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    width: {
        width: 105,
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
        textAlign: 'right'
    },
    btnStyle: {
        backgroundColor: '#3385ff', height: 45, width: SCREEN_WIDTH - 32, top: 150, position: 'absolute', margin: 16,
    },
    formInput: {
        height: 40,
        marginTop: 5,
        marginBottom: 5
    },
    tag: {
        backgroundColor: '#fff',
        borderRadius: 5,
        minHeight: 22,
        padding: 10,
        marginRight: 10,
        marginTop: 10,
        borderWidth:1,
        borderColor: '#3385ff',
    },
    btnGray: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        minHeight: 22,
        padding: 10,
        marginRight: 10,
        marginTop: 10,
        borderWidth:1,
        borderColor: '#ddd',
    },
    btnPrimary:{
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputViewStyle: {
        height: 39.5,
        width: SCREEN_WIDTH-150,
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

class InventoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state={
            code: null,
            userId: null,
            planId: null,
            type: null,
            itemId: null,
            itemInfo: null,
            loading: true,
            dict1: [],
            dict2: [],
            resultCode: null,
            remark: null,
            errorCode: null,
            position: null,
            submitSuccess: false,
        };
    }

    componentDidMount() {
        this.setState({ data: this.props.navigation.state.params });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        const paramData = this.props.navigation.state.params;
        const { data, userId, planId, type, itemInfo, itemId, dict1, dict2 } = paramData;
        this.setState({ code: data, userId, planId, type, itemInfo, itemId, dict1, dict2 });
        if(type === 1){
            const dict = [
                {
                    typename: "合格",
                    typecode: "1"
                },
                {
                    typename: "不合格",
                    typecode: "2"
                },
            ];
            this.setState({dict1: dict});
        }

    }

    onBackButtonPressAndroid = () => {
        const { type, userId } = this.state;
        if(type === 1){
            this.props.navigation.navigate('InventoryView',{userId});
        }else  if(type === 2){
            this.props.navigation.navigate('CheckView',{userId});
        }else  if(type === 3){
            this.props.navigation.navigate('MaintainView',{userId});
        }
        return true;

    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onSubmit() {
        const { resultCode, remark, position, userId, planId, type } = this.state;
        if (resultCode === null) {
            ToastAndroid.show("请选择巡检结果！", ToastAndroid.SHORT);
            return;
        }
        let formData = new FormData();
        let url;
        if (type === 1) {
            url = Api.url + "xunjianSubmit";
            formData.append("userId", userId);
            formData.append("itemId", planId);
            formData.append("result", resultCode);
            formData.append("report", remark);
            formData.append("position", position);
        }
        if (type === 2) {
            url = Api.url + "pandianSubmit";
            formData.append("userId", userId);
            formData.append("itemId", planId);
            formData.append("report", resultCode);
            formData.append("report", remark);
            formData.append("position", position);
        }
        const that = this;
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (json) {
                    console.log(json);
                    if (json.success) {
                        Alert.alert('提示', json.msg, [{ text: '确定',
                         onPress: () => that.setState({submitSuccess: true}) },]);
                    } else if (json.msg) {
                        Alert.alert('提示', json.msg, [{ text: '确定',
                         onPress: () => that.setState({submitSuccess: true}) },]);
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

    seclectItem(code,type) {
        if(type === 1){
            this.setState({resultCode: code});
        }
        if(type === 2){
            this.setState({position: code});
        }
    }

    render() {
        const sty = style;
        const { itemInfo, dict1, dict2, resultCode, type, submitSuccess, position} = this.state;
        if(submitSuccess){
            this.onBackButtonPressAndroid();

        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }} keyboardShouldPersistTaps="always">
                <ScrollView
                    style={{ flex: 1 }}
                    ref={(ref) => { this.scrollView = ref; }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps
                >
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            设备名称：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                                {itemInfo ? itemInfo.name : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            资产类型：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.deviceType : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            院内资产编码：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.code : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            所属科室：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.dept : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            规格型号：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.format : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            品牌：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.brand : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            供应商：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.supplier : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            安装日期：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.installDate : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            设备序列号：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            设备保管人：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.manager : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            是否计量设备：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <Text style={{ fontSize: 15, color: '#39333d' }}>
                            {itemInfo ? itemInfo.isMeasurement : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            巡检结果：
                        </Text>
                        <View style={[{ flex: 1,width: SCREEN_WIDTH-120,flexWrap:'wrap' }, sty.list]}>
                            {dict1.map(i => (
                                <TouchableOpacity onPress={() => this.seclectItem(i.typecode,1)} key={i.typecode}>
                                    <View style={resultCode === i.typecode ? sty.tag : sty.btnGray}>
                                    <Text style={{ fontSize: 15, color: '#39333d' }}>
                                        {i.typename}
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {type === 1?
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            盘点位置说明：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <TextInput style={sty.inputViewStyle}
                                onChangeText={(text) => {
                                    this.setState({ position: text });
                                }}
                            />
                        </View>
                    </View>
                    : null}
                    {type === 2?
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            巡检位置说明：
                        </Text>
                        <View style={[{ flex: 1,width: SCREEN_WIDTH-120,flexWrap:'wrap' }, sty.list]}>
                            {dict2.map(i => (
                                <TouchableOpacity onPress={() => this.seclectItem(i.typecode,2)} key={i.typecode}>
                                    <View style={position === i.typecode ? sty.tag : sty.btnGray}>
                                    <Text style={{ fontSize: 15, color: '#39333d' }}>
                                        {i.typename}
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    : null}
                    <View style={sty.content}>
                        <Text style={[sty.opc, sty.width, sty.mgr_5, { fontSize: 15, color: '#39333d' }]}>
                            备注：
                        </Text>
                        <View style={[{ flex: 1 }, sty.list]}>
                            <TextInput style={sty.inputViewStyle}
                                onChangeText={(text) => {
                                    this.setState({ remark: text });
                                }}
                            />
                        </View>
                    </View>
                    <View style={[sty.content, {paddingBottom: 80, justifyContent: 'center'}]}>
                        <TouchableOpacity onPress={() => this.onSubmit()}>
                            <View style={[sty.tag,{backgroundColor: '#3385ff' },sty.btnPrimary]}>
                                <Text style={{ fontSize: 15, color: '#39333d' }}>
                                    提交
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onBackButtonPressAndroid()}>
                            <View style={[sty.tag,{backgroundColor: '#3385ff' },sty.btnPrimary]}>
                                <Text style={{ fontSize: 15, color: '#39333d' }}>
                                    取消
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

}


export default InventoryInfo;
