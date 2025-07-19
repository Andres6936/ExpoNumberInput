import React from "react";
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react-native";
import * as NumberInputPrimitive from 'expo-number-input'
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

export const NumericInputMoreLess = (
    {
        borderColor = '#d4d4d4',
        rounded = false,
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps
) => {
    const inputContainerStyle = [{
        borderColor: borderColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: '100%',
        borderWidth: 0.7,
    }] satisfies StyleProp<ViewStyle>

    const iconStyle = [style.icon, props.iconStyle]

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.DecrementAction
                Icon={Minus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}]
                })}
                viewProps={{
                    style: {backgroundColor: rightButtonBackgroundColor, height: '100%', aspectRatio: "1/1", alignItems: 'center', justifyContent: 'center', borderRightColor: "#CCC", borderRightWidth: 0.7},
                }}
            />
            <NumberInputPrimitive.Input style={{flex: 1, width: "100%"}}/>
            <NumberInputPrimitive.IncrementAction
                Icon={Plus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}]
                })}
                viewProps={{
                    style: {backgroundColor: leftButtonBackgroundColor, height: '100%', aspectRatio: "1/1", alignItems: 'center', justifyContent: 'center', borderLeftColor: "#CCC", borderLeftWidth: 0.7},
                }}
            />
        </NumberInputPrimitive.Root>
    )
}

export const NumericInputUpDown = (
    {
        borderColor = '#d4d4d4',
        rounded = false,
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps
) => {
    const inputContainerStyle = [{
        flexDirection: 'row',
        alignItems: "center",
        borderColor: borderColor,
        flex: 1,
        borderWidth: 0.7,
    }]

    const iconStyle = [style.icon, props.iconStyle]

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.Input style={{flex: 1}}/>
            <NumberInputPrimitive.Container style={{aspectRatio: "1/1", alignItems: "center", justifyContent:"center", backgroundColor:"white", borderLeftColor: "#CCC", borderLeftWidth: 0.7, flexDirection: "column", height: "100%"}}>
                <NumberInputPrimitive.IncrementAction
                    Icon={ChevronUp}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}]
                    })}
                />
                <NumberInputPrimitive.DecrementAction
                    Icon={ChevronDown}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}]
                    })}
                />
            </NumberInputPrimitive.Container>
        </NumberInputPrimitive.Root>
    )
}


const style = StyleSheet.create({
    seprator: {
        backgroundColor: 'grey',
        height: 80,
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
        paddingRight: 15
    }
})