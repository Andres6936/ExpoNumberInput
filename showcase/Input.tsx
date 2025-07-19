import React from "react";
import {ChevronDown, ChevronUp, Minus, Plus} from "lucide-react-native";
import * as NumberInputPrimitive from 'expo-number-input'
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";


type NumericInputProps = {
    borderColor : string,
    rightButtonBackgroundColor : string,
    leftButtonBackgroundColor : string,
    reachMaxIncIconStyle : StyleProp<ViewStyle>,
    reachMinIncIconStyle : StyleProp<ViewStyle>,
    reachMaxDecIconStyle : StyleProp<ViewStyle>,
    reachMinDecIconStyle : StyleProp<ViewStyle>,
}


export const NumericInputMoreLess = (
    {
        borderColor = '#d4d4d4',
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps & NumericInputProps
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

    const iconStyle = [style.icon, {fontSize: 15, color: '#434A5E'}]

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.DecrementAction
                Icon={Minus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}] as StyleProp<ViewStyle>
                })}
                viewProps={{
                    style: {backgroundColor: rightButtonBackgroundColor, height: '100%', aspectRatio: "1/1", alignItems: 'center', justifyContent: 'center', borderRightColor: "#CCC", borderRightWidth: 0.7},
                }}
            />
            <NumberInputPrimitive.Input style={{flex: 1, width: "100%"}}/>
            <NumberInputPrimitive.IncrementAction
                Icon={Plus}
                iconProps={({isMaxReached, isMinReached}) => ({
                    style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}] as StyleProp<ViewStyle>
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
        rightButtonBackgroundColor = 'white',
        leftButtonBackgroundColor = 'white',
        ...props
    }: NumberInputPrimitive.RootProps & NumericInputProps
) => {
    const inputContainerStyle = [{
        flexDirection: 'row',
        alignItems: "center",
        borderColor: borderColor,
        flex: 1,
        borderWidth: 0.7,
    }] satisfies StyleProp<ViewStyle>

    const iconStyle = [style.icon, {fontSize: 15, color: '#434A5E'}]

    return (
        <NumberInputPrimitive.Root {...props} style={inputContainerStyle}>
            <NumberInputPrimitive.Input style={{flex: 1}}/>
            <NumberInputPrimitive.Container style={{aspectRatio: "1/1", alignItems: "center", justifyContent:"center", backgroundColor:"white", borderLeftColor: "#CCC", borderLeftWidth: 0.7, flexDirection: "column", height: "100%"}}>
                <NumberInputPrimitive.IncrementAction
                    Icon={ChevronUp}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [...iconStyle, isMaxReached ? props.reachMaxDecIconStyle : {}, isMinReached ? props.reachMinDecIconStyle : {}] as StyleProp<ViewStyle>
                    })}
                />
                <NumberInputPrimitive.DecrementAction
                    Icon={ChevronDown}
                    iconProps={({isMaxReached, isMinReached}) => ({
                        size: 20,
                        style: [...iconStyle, isMaxReached ? props.reachMaxIncIconStyle : {}, isMinReached ? props.reachMinIncIconStyle : {}] as StyleProp<ViewStyle>
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