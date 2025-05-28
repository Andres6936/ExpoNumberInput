import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {Color} from "csstype";
import Button from "./Button";
import Icon from 'react-native-vector-icons/Ionicons'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

let calcSize = create(PREDEF_RES.iphone7.px)

type Props = {
    value?: number
    minValue?: number
    maxValue?: number
    step?: number
    valueType?: 'integer' | 'real'
    initValue?: number
    iconSize?: number
    borderColor?: Color
    iconStyle?: ViewStyle
    totalWidth?: number
    separatorWidth?: number
    type?: 'plus-minus' | 'up-down'
    rounded?: boolean
    textColor?: Color
    containerStyle?: ViewStyle
    inputStyle?: ViewStyle
    upDownButtonsBackgroundColor?: Color
    rightButtonBackgroundColor?: Color
    leftButtonBackgroundColor?: Color
    totalHeight?: number
    onChange: (value: number) => void
    onLimitReached?: (isMax: boolean, msg: string) => void
    editable?: boolean
    validateOnBlur?: boolean
    reachMaxIncIconStyle?: ViewStyle
    reachMaxDecIconStyle?: ViewStyle
    reachMinIncIconStyle?: ViewStyle
    reachMinDecIconStyle?: ViewStyle
    extraTextInputProps?: object
}

export function NumericField({initValue, value: propValue, ...props}: Props) {
    const noInitSent = initValue !== 0 && !initValue;
    const [value, setValue] = useState(
        noInitSent ? (propValue ?? 0) : initValue
    );
    const [lastValid, setLastValid] = useState(
        noInitSent ? (propValue ?? 0) : initValue
    );
    const [stringValue, setStringValue] = useState(
        (noInitSent ? (propValue ?? 0) : initValue).toString()
    );
    const ref = useRef(null);

    // This replaces componentDidUpdate
    useEffect(() => {
        const initSent = !(initValue !== 0 && !initValue);

        if (initValue !== value && initSent) {
            setValue(initValue);
            setLastValid(initValue);
            setStringValue(initValue.toString());
        }
    }, [initValue, value]);

    const editable = props.editable
    const sepratorWidth = (typeof props.separatorWidth === 'undefined') ? props.sepratorWidth : props.separatorWidth;//supporting old property name sepratorWidth
    const borderColor = props.borderColor
    const iconStyle = [style.icon, props.iconStyle]
    const totalWidth = props.totalWidth
    const totalHeight = props.totalHeight ? props.totalHeight : (totalWidth * 0.4)
    const inputWidth = props.type === 'up-down' ? (totalWidth * 0.6) : (totalWidth * 0.4)
    const borderRadiusTotal = totalHeight * 0.18
    const fontSize = totalHeight * 0.38
    const textColor = props.textColor
    const maxReached = value === props.maxValue
    const minReached = value === props.minValue
    const inputContainerStyle = props.type === 'up-down' ?
        [style.inputContainerUpDown, {
            width: totalWidth,
            height: totalHeight,
            borderColor: borderColor
        }, props.rounded ? {borderRadius: borderRadiusTotal} : {}, props.containerStyle] :
        [style.inputContainerPlusMinus, {
            width: totalWidth,
            height: totalHeight,
            borderColor: borderColor
        }, props.rounded ? {borderRadius: borderRadiusTotal} : {}, props.containerStyle]
    const inputStyle = props.type === 'up-down' ?
        [style.inputUpDown, {
            width: inputWidth,
            height: totalHeight,
            fontSize: fontSize,
            color: textColor,
            borderRightWidth: 2,
            borderRightColor: borderColor
        }, props.inputStyle] :
        [style.inputPlusMinus, {
            width: inputWidth,
            height: totalHeight,
            fontSize: fontSize,
            color: textColor,
            borderRightWidth: sepratorWidth,
            borderLeftWidth: sepratorWidth,
            borderLeftColor: borderColor,
            borderRightColor: borderColor
        }, props.inputStyle]
    const upDownStyle = [{
        alignItems: 'center',
        width: totalWidth - inputWidth,
        backgroundColor: props.upDownButtonsBackgroundColor,
        borderRightWidth: 1,
        borderRightColor: borderColor
    }, props.rounded ? {borderTopRightRadius: borderRadiusTotal, borderBottomRightRadius: borderRadiusTotal} : {}]
    const rightButtonStyle = [
        {
            position: 'absolute',
            zIndex: -1,
            right: 0,
            height: totalHeight - 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            backgroundColor: props.rightButtonBackgroundColor,
            width: (totalWidth - inputWidth) / 2
        },
        props.rounded ?
            {
                borderTopRightRadius: borderRadiusTotal,
                borderBottomRightRadius: borderRadiusTotal
            }
            : {}]
    const leftButtonStyle = [
        {
            position: 'absolute',
            zIndex: -1,
            left: 0,
            height: totalHeight - 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.leftButtonBackgroundColor,
            width: (totalWidth - inputWidth) / 2,
            borderWidth: 0
        },

        props.rounded ?
            {borderTopLeftRadius: borderRadiusTotal, borderBottomLeftRadius: borderRadiusTotal}
            : {}]

    const inputWraperStyle = {
        alignSelf: 'center',
        borderLeftColor: borderColor,
        borderLeftWidth: sepratorWidth,
        borderRightWidth: sepratorWidth,
        borderRightColor: borderColor
    }

    if (props.type === 'up-down')
        return (
            <View style={inputContainerStyle}>
                <TextInput {...props.extraTextInputProps} editable={editable} returnKeyType='done'
                           underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={this.state.stringValue}
                           onChangeText={this.onChange} style={inputStyle} ref={ref => this.ref = ref}
                           onBlur={this.onBlur} onFocus={this.onFocus}/>
                <View style={upDownStyle}>
                    <Button onPress={this.inc} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <Icon name='ios-arrow-up' size={fontSize}
                              style={[...iconStyle, maxReached ? props.reachMaxIncIconStyle : {}, minReached ? props.reachMinIncIconStyle : {}]}/>
                    </Button>
                    <Button onPress={this.dec} style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <Icon name='ios-arrow-down' size={fontSize}
                              style={[...iconStyle, maxReached ? props.reachMaxDecIconStyle : {}, minReached ? props.reachMinDecIconStyle : {}]}/>
                    </Button>
                </View>
            </View>)
    else return (
        <View style={inputContainerStyle}>
            <Button onPress={this.dec} style={leftButtonStyle}>
                <Icon name='md-remove' size={fontSize}
                      style={[...iconStyle, maxReached ? props.reachMaxDecIconStyle : {}, minReached ? props.reachMinDecIconStyle : {}]}/>
            </Button>
            <View style={[inputWraperStyle]}>
                <TextInput {...props.extraTextInputProps} editable={editable} returnKeyType='done'
                           underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={this.state.stringValue}
                           onChangeText={this.onChange} style={inputStyle} ref={ref => this.ref = ref}
                           onBlur={this.onBlur} onFocus={this.onFocus}/>
            </View>
            <Button onPress={this.inc} style={rightButtonStyle}>
                <Icon name='md-add' size={fontSize}
                      style={[...iconStyle, maxReached ? props.reachMaxIncIconStyle : {}, minReached ? props.reachMinIncIconStyle : {}]}/>
            </Button>
        </View>
    )
}


const style = StyleSheet.create({
    seprator: {
        backgroundColor: 'grey',
        height: calcSize(80),
    },
    inputContainerUpDown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderColor: 'grey',
        borderWidth: 1
    },
    inputContainerPlusMinus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    inputUpDown: {
        textAlign: 'center',
        padding: 0

    },
    inputPlusMinus: {
        textAlign: 'center',
        padding: 0
    },
    icon: {
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    upDown: {
        alignItems: 'center',
        paddingRight: calcSize(15)
    }
})